import os
from turtle import position
import requests
from bs4 import BeautifulSoup, Tag
import pandas as pd
import re
import json
import copy

def scraper_fse(url="https://www.cse.sci.waseda.ac.jp/department-en/me/", schoolName="CSE", majorName="ME"):
    webpage_response = requests.get(url)
    webpage = webpage_response.content
    soup = BeautifulSoup(webpage, "html.parser")

    lab_infos = {}
    # lab_infos["profNames"] = []
    # lab_infos["profImgs"] = []
    # lab_infos["profPositions"] = []
    # lab_infos["researchAreas"] = []
    # lab_infos["labWebsites"] = []
    faculty_list_tr = soup.select("#teacher_table .teacher_h.imgd tr")
    # print(faculty_list_tr)
    
    idxx = 0
    for index,tr in enumerate(faculty_list_tr):
        if (index % 2 == 0): #Name and title and img and labWebsite lines, even number
            lab_infos[idxx] = {}
            td_list = tr.select("td")
            for idx, td in enumerate(td_list):
                if idx % 2 == 0: #img and labWebsite 
                    first_child = td.select(":first-child")[0]
                    if (first_child.name == 'img'):
                        img_url = first_child["src"]
                        lab_infos[idxx]["profImg"]=(img_url)
                        lab_infos[idxx]["labWebsite"]=("none")
                    else:
                        img_tag = first_child.select(":first-child")[0]
                        img_url = img_tag["src"]
                        lab_infos[idxx]["profImg"]=(img_url)
                        
                        a_tag_only = copy.copy(first_child)
                        a_tag_only.clear()
                        lab_url = a_tag_only["href"]
                        lab_infos[idxx]["labWebsite"]=(lab_url)
                else: #name and title
                    content = (td.contents)
                    if len(content) == 1: #has lab labWebsite, only "a" tag
                        result = content[0].contents
                        # print(result)
                        name = result[0]
                        # print(name)
                        lab_infos[idxx]["profName"]=(name)
                    
                        for child in result:
                            if child.name == "span":
                                title = child.text
                                lab_infos[idxx]["profPosition"]=(title)
                                
                    else: #does not have lab labWebsite 
                        name = content[0]
                        lab_infos[idxx]["profName"]=(name)
                        for i in range(len(content)):
                            if content[i].name =="span":
                                # print(content[i])
                                title = content[i].text
                                lab_infos[idxx]["profPosition"]=(title)
                    idxx+=1
                    if (index != len(faculty_list_tr)-2):
                        lab_infos[idxx] = {}
                    
        else: ## research field lines, odd number of line
            idxx = idxx -2 if idxx != len(faculty_list_tr)-1 else idxx-1
            td_list = tr.select("td")
            # print(td_list) #one or two
        
            content_1 = td_list[0].contents 
            content_2 = td_list[1].contents if len(td_list) > 1 else []
            for content in [content_1, content_2]:
                if content:
                    research_field = content[0]
                    research_field_name = re.search(r"Research Field：(.*)",research_field).group(1)
                    lab_infos[idxx]["researchAreas"] = []
                    lab_infos[idxx]["researchAreas"].append(research_field_name)
                idxx+=1        
            
            
            
            # print(content_2)
            # print(content_1, content_2)
    script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
    rel_path = "./"+schoolName+'/'+f"{majorName}.json"
    abs_file_path = os.path.join(script_dir, rel_path)        
    with open(abs_file_path, mode="w+") as file:
        json.dump(lab_infos, file, sort_keys=True, indent=4)
    
scraper_fse(url="https://www.cse.sci.waseda.ac.jp/department-en/ce/", schoolName="CSE", majorName="CE")
scraper_fse(url="https://www.cse.sci.waseda.ac.jp/department-en/me/", schoolName="CSE", majorName="ME")

