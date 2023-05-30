"""Movie API to allocate movie cradentials"""
import os
import requests
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

# pylint: disable=invalid-name
def movieRetrieve(random_Movie):
    """Allocates Movie cradentials into a list"""
    movies = {
        "Spider_man_NWH": "634649",
        "DBS_Broly": "503314",
        "Demon_Slayer": "635302",
        "Your_Name": "372058",
        "A_Silent_Voice": "378064",
        "FateStayNightHF1": "283984",
        "FateStayNightHF2": "390634",
        "FateStayNightHF3": "390635",
    }
    MOVIE_ID = movies.values()
    movie_key = os.getenv("movie_key")

    BASE_URL = []
    MOVIE_CRADENTIALS = []
    IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/"
    for i in MOVIE_ID:
        BASE_URL.append(
            "https://api.themoviedb.org/3/movie/"
            + str(i)
            + "?api_key="
            + str(movie_key)
            + "&language=en-US"
        )

    # val = random.randint(0,8)
    BASE_URL = BASE_URL[random_Movie]
    quary_parameter = {
        "api_key": movie_key,
    }
    response = requests.get(BASE_URL, params=quary_parameter)
    MOVIE_CRADENTIALS.append(response.json()["title"])
    MOVIE_CRADENTIALS.append(response.json()["tagline"])
    genra = response.json()["genres"]
    for names in genra:
        MOVIE_CRADENTIALS.append(names["name"])
    MOVIE_CRADENTIALS.append(response.json()["overview"])
    MOVIE_CRADENTIALS.append(IMAGE_BASE_URL + response.json()["poster_path"])
    return MOVIE_CRADENTIALS
