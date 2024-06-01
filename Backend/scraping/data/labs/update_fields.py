import json 
import os 


def update_comments_and_ratings(schoolName, majorName):
    script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
    rel_path = "./"+schoolName+'/'+f"{majorName}.json"
    abs_file_path = os.path.join(script_dir, rel_path)        
    with open(abs_file_path) as file:
       data = json.load(file)
    for key in data:
        data[key]["comments"] = []
        data[key]["ratings"] = []
        data[key]["rating"] = 0
        data[key]["index"] = key
    with open(abs_file_path, mode="w+") as file:
        json.dump(data, file, sort_keys=True, indent=4)                                
update_comments_and_ratings("FSE", "CSCE")
update_comments_and_ratings("FSE", "MS")
update_comments_and_ratings("CSE", "ME")
update_comments_and_ratings("CSE", "CE")
update_comments_and_ratings("ASE", "Bioscience")
update_comments_and_ratings("ASE", "Chemistry")
update_comments_and_ratings("ASE", "Physics")