from bs4 import BeautifulSoup
import requests
import re


def get_num_participants():
    page = requests.get('https://gta-hacks-11408.devpost.com/')
    soup = BeautifulSoup(page.text, 'html.parser')
    return re.findall(r'\d+',
                      str(soup.findAll('a', href=re.compile('^https://gta-hacks-11408.devpost.com/participants'))[0])[59:])[0]
