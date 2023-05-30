import os
from dotenv import find_dotenv, load_dotenv
import requests
import json
load_dotenv(find_dotenv())

def astro():
    api_key = os.getenv("API_KEY")
    base_url = "https://api.nasa.gov/planetary/apod?api_key="
    image = requests.get(
        base_url+api_key
    )
    return image.json()["title"], image.json()["explanation"], image.json()["date"], image.json()["url"]
