import os
from turtle import position
import requests
from bs4 import BeautifulSoup
import pandas as pd
import re
import json


def scraper_fse(url, schoolName, majorName):
    webpage_response = requests.get(url)
    webpage = webpage_response.content
    soup = BeautifulSoup(webpage, "html.parser")

    lab_infos = {}
    lab_infos["prof_names"] = []
    lab_infos["prof_imgs"] = []
    lab_infos["prof_positions"] = []
    lab_infos["research_areas"] = []
    lab_infos["websites"] = []

    faculty_list_div_tag = soup.select(".facultylist ul li")

    for li in faculty_list_div_tag:
        for prof_name in li.select(".profname strong"):
            lab_infos["prof_names"].append(prof_name.get_text())
        for positions in li.select(".profname span.posi"):
            lab_infos["prof_positions"].append(positions.get_text())
        for prof_img_div in li.select(".profinfoimg"):
            img_tag = prof_img_div.find("img")
            lab_infos["prof_imgs"].append(img_tag["src"])
        for link in li.select("a"):
            lab_infos["websites"].append(link["href"])
        for specialize in li.select(".specialized"):
            raw_text = specialize.text
            areas = re.findall("(?<=■Research Areas).*", raw_text)
            areas = areas[0].split(",")
            for i, area in enumerate(areas):
                areas[i] = re.sub('[^\x00-\x7F]', '', areas[i])
            lab_infos["research_areas"].append(areas)


# print(lab_infos["research_areas"])
    saveDirectory = "./Data/"+schoolName+'/'+f"{majorName}.json"
    with open(saveDirectory, mode="w+") as file:
        json.dump(lab_infos, file, sort_keys=True, indent=4)

scraper_fse("https://www.fse.sci.waseda.ac.jp/en/faculty/csce/","FSE", "CSCE")
scraper_fse("https://www.fse.sci.waseda.ac.jp/en/faculty/ms/","FSE", "MS")