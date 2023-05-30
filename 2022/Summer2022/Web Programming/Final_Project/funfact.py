import os
import requests
from dotenv import find_dotenv, load_dotenv
import random
def res():
    limit = 1
    api_key = os.getenv("API_KEY2")
    api_url = 'https://api.api-ninjas.com/v1/facts?limit={}'.format(limit)
    response = requests.get(api_url, headers={'X-Api-Key': api_key})
    if response.status_code == requests.codes.ok:
        return response.json()[0]['fact']
    else:
        return{"Error:", response.status_code, response.text}
    
