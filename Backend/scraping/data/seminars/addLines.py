import json

listJson = ["/Users/mik/GDSC Project/Collab4_WasedaLabs/Backend/scraping/data/seminars/datatestSchlPoliticalSciEcono2.json", "/Users/mik/GDSC Project/Collab4_WasedaLabs/Backend/scraping/data/seminars/datatestSILS2.json", "/Users/mik/GDSC Project/Collab4_WasedaLabs/Backend/scraping/data/seminars/datatestSchlSocialSci2.json"]

# Load the JSON file
for f in listJson:
    with open(f, 'r') as file:
        data = json.load(file)

    # Modify the JSON structure
    for key in data.keys():
        data[key]['rating'] = 0
        data[key]['ratings'] = []

    # Save the modified JSON back to the file
    with open(f, 'w') as file:
        json.dump(data, file, indent=4)

    print("JSON file has been modified and saved as data_modified.json.")