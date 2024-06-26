from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
from bs4 import BeautifulSoup
import pandas as pd
from io import StringIO
from json import loads,dumps

def main_data_scrape(x): 
    lang_list = ["English","Japanese/English"]
    out_list = []
    for lang in lang_list:
        driver = webdriver.Firefox()
        driver.get('https://www.wsl.waseda.jp/syllabus/JAA101.php?pLng=en') #load website

        # keywords_tb = driver.find_element(By.ID, "keyword")
        # keywords_tb.send_keys("Seminar")

        term_dd = driver.find_element(By.NAME,"p_gakki")
        Select(term_dd).select_by_value
        lang_dd = driver.find_element(By.NAME,"p_gengo")
        Select(lang_dd).select_by_visible_text(lang) #means english, but i should probably add japanese/english too

        school_dd = driver.find_element(By.NAME,"p_gakubu")
        # Select(school_dd).select_by_value("212004") #this is for SILS, others include: 
        Select(school_dd).select_by_visible_text(x)
        
        search_b = driver.find_element(By.NAME,"btnSubmit")
        search_b.click()

        driver.execute_script("func_showchg('JAA103SubCon', '500');")

        driver.maximize_window()
        html1 = str(driver.page_source)

        #handover to bs4
        soup = BeautifulSoup(html1,"lxml")
        table = soup.find('table', class_='ct-vh')
        df = pd.read_html(StringIO(str(table)))[0]
        df_semi = df[df['Course Code'].str.endswith('S',na=False)]
        df_thesis = df[df['Course Code'].str.endswith('T',na=False)] #needed for pse d
        df_new = pd.concat([df_semi,df_thesis])
        df_new['Language']=lang
        out_list.append(df_new)

        driver.close()
    df_final = pd.concat(out_list,ignore_index=True)
    # df_final = df_final.iloc[: , 1:]

    # x = x.replace(" ","").replace("/","")
    # df_final.to_csv('/Users/mik/Data Scraping/results/'+x+"_mainv2.csv")

    result = df_final.to_json(orient="columns")
    parsed = loads(result)
    json_object = dumps(parsed,indent=4)
    x = x.replace(" ","").replace("/","")
    with open('data'+x+'.json', 'w', encoding='utf-8') as f:
        f.write(json_object)


dept = ["SILS","Schl Political Sci/Econo","Schl Social Sci"]

for i in dept:
    main_data_scrape(i)
