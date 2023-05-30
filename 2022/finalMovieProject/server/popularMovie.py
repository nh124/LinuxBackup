import os
import requests
from dotenv import find_dotenv, load_dotenv
import json
import numpy as np

load_dotenv(find_dotenv())


def popularMovie(number):
    movie_key = os.getenv("movie_key")
    quary_parameter = {
        "api_key": movie_key,
    }
    BASE_URL = "https://api.themoviedb.org/3/movie/popular"+"?api_key="+movie_key +"&language=en-US&page=1"
    IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/"
    response = requests.get(BASE_URL, params=quary_parameter)
    cra = response.json()
    # listOfMovies = []
    # if int(number) > 0:
    #     for i in range(int(number)):
    #         try:
    #             listOfMovies.append([cra["results"][i]["original_title"], IMAGE_BASE_URL+cra["results"][i]["poster_path"]])
    #         except:
    #             listOfMovies.append(cra["results"][i]["original_title"])
    # for i in range(int(number)):
    #         try:
    #             listOfMovies.append([cra["results"][i]["original_title"], IMAGE_BASE_URL+cra["results"][i]["poster_path"]])
    #         except:
    #             listOfMovies.append([cra["results"][i]["original_title"], [""]])
    # listOfMovies = np.array(listOfMovies)
    return cra
    
def searchMovie(searching):
    movie_key = os.getenv("movie_key")
    Search_URL = "https://api.themoviedb.org/3/search/movie"+"?api_key="+movie_key+"&language=en-US&"+"query="+searching+"&page=1&include_adult=false"
    IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/"
    quary_parameter = {
        "api_key": movie_key,
    }
    response = requests.get(Search_URL, params=quary_parameter)
    listOfMovies = []
    cra = response.json()
    for i in range(len(cra["results"])):
        try:
            listOfMovies.append([cra["results"][i]["original_title"], IMAGE_BASE_URL+cra["results"][i]["poster_path"]])
        except:
            listOfMovies.append([cra["results"][i]["original_title"], [""]])
    listOfMovies = np.array(listOfMovies)
    return listOfMovies
