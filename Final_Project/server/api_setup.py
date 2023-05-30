"""This module is YELP API set up"""

import os
import requests
from dotenv import find_dotenv, load_dotenv


load_dotenv(find_dotenv())

API_KEY_YELP = os.getenv("API_KEY_YELP")
BASE_URL = "https://api.yelp.com/v3/businesses/"


def get_data(searched_value):
    """function to get business_data
    about restaurant using a name"""
    _params = {
        "term": searched_value,
        "radius": 2000,
        "latitude": 33.75662886123124,
        "longitude": -84.38882273143552,
    }
    _headers = {"Authorization": "Bearer " + API_KEY_YELP}
    data = requests.get(BASE_URL + "search", params=_params, headers=_headers)
    business_data = requests.get(
        BASE_URL + data.json()["businesses"][0]["id"], headers=_headers
    )

    return {
        # "all_data": data.json(),
        "business_data": business_data.json()  # has all info about searched item
    }
