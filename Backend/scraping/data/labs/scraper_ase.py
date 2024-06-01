import os
from turtle import position
import requests
from bs4 import BeautifulSoup, Tag
import pandas as pd
import re
import json
import copy

def scraper_fse(url="https://www.ase.sci.waseda.ac.jp/english/departments/physics.php", schoolName="ASE", majorName="Physics"):
    webpage_response = requests.get(url)
    webpage = webpage_response.content
    soup = BeautifulSoup(webpage, "html.parser")

    lab_infos = {}
    faculty_list_div_tag = soup.select(".wrap_faculty .faculty")
    
    # print(faculty_list_div_tag)
    index = 0 
    for faculty_tag in faculty_list_div_tag:
        lab_infos[index] = {}
        a_link = faculty_tag.select("a")[0]
        a_link_only = copy.copy(a_link)
        a_link_only.clear()
        labWebsite_url = a_link_only["href"]
        lab_infos[index]["labWebsite"]=(labWebsite_url) if labWebsite_url else "none"
        
        
        photo_div = a_link.select(".photo")[0]
        photo_url = re.search(r'url\((.*?)\)', photo_div["style"]).group(1)
        photo_url = "https://www.ase.sci.waseda.ac.jp/english/departments/" + photo_url
        # print(photo_url)
        lab_infos[index]["profImg"]=(photo_url)
        
        person_div = a_link.select(".person")[0]
        professor_name = person_div.select(".name")[0].text
        lab_infos[index]["profName"]=(professor_name)
        
        profesosr_position = person_div.select(".position")[0].text
        lab_infos[index]["profPosition"]=(profesosr_position)
        
        research_field = faculty_tag.select(".info .txt01 p")[0].text
        
        lab_infos[index]["researchAreas"]=[]
        lab_infos[index]["researchAreas"].append(research_field)
        index+=1 
    
    script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
    rel_path = "./"+schoolName+'/'+f"{majorName}.json"
    abs_file_path = os.path.join(script_dir, rel_path)        
    with open(abs_file_path, mode="w+") as file:
        json.dump(lab_infos, file, sort_keys=True, indent=4)
    

scraper_fse("https://www.ase.sci.waseda.ac.jp/english/departments/physics.php","ASE", "Physics")
scraper_fse("https://www.ase.sci.waseda.ac.jp/english/departments/chemistry.php","ASE", "Chemistry")
scraper_fse("https://www.ase.sci.waseda.ac.jp/english/departments/bioscience.php","ASE", "Bioscience")

