
import os
from turtle import position
import requests
from bs4 import BeautifulSoup
import pandas as pd
import re
import json

script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
rel_path = "./data/FSE/CSCE.json"
abs_file_path = os.path.join(script_dir, rel_path)
print(abs_file_path) #<-- absolute

def scraper_fse(url, schoolName, majorName):
    webpage_response = requests.get(url)
    webpage = webpage_response.content
    soup = BeautifulSoup(webpage, "html.parser")

    lab_infos = {}
    # lab_infos["profNames"] = []
    # lab_infos["profImgs"] = []
    # lab_infos["profPositions"] = []
    # lab_infos["researchAreas"] = []
    # lab_infos["labWebsites"] = []

    faculty_list_div_tag = soup.select(".facultylist ul li")

    index = 0
    for li in faculty_list_div_tag:
        lab_infos[index] = {}
        
        for profName in li.select(".profname strong"):
            lab_infos[index]["profName"]= profName.get_text()
        for positions in li.select(".profname span.posi"):
            lab_infos[index]["profPosition"] = positions.get_text()
        for profImg_div in li.select(".profinfoimg"):
            img_tag = profImg_div.find("img")
            lab_infos[index]["profImg"] = (img_tag["src"])
        for link in li.select("a"):
            lab_infos[index]["labWebsite"] = (link["href"])
        if li.select("a") == []:
            lab_infos[index]["labWebsite"] = "none"
        for specialize in li.select(".specialized"):
            raw_text = specialize.text
            areas = re.findall("(?<=■Research Areas).*", raw_text)
            # print(areas[0])
            areas = areas[0].split(",")
            for i, area in enumerate(areas):
                areas[i] = re.sub('[^\x00-\x7F]', '', areas[i])
            lab_infos[index]["researchAreas"] = (areas)
        index+=1
            
        
        

# print(lab_infos["researchAreas"])
    script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
    rel_path = "./"+schoolName+'/'+f"{majorName}.json"
    abs_file_path = os.path.join(script_dir, rel_path)        
    with open(abs_file_path, mode="w+") as file:
        json.dump(lab_infos, file, sort_keys=True, indent=4)

scraper_fse("https://www.fse.sci.waseda.ac.jp/en/faculty/csce/","FSE", "CSCE")
scraper_fse("https://www.fse.sci.waseda.ac.jp/en/faculty/ms/","FSE", "MS")