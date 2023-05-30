from textwrap import indent
import requests
import json
import os 
from dotenv import find_dotenv, load_dotenv
from simplejson import load

load_dotenv(find_dotenv())

movie_key = os.getenv("movie_key")
# base_url = "https://api.themoviedb.org/3/configuration?api_key=" + movie_key
# base_url = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US"
# movies link
base_url = "https://api.themoviedb.org/3/movie/557?api_key=" + movie_key + "&language=en-US"
#configuration
# base_url = "https://api.themoviedb.org/3/configuration?api_key=" + movie_key

# base_url = "https://api.themoviedb.org/3/trending/all/day?api_key" + movie_key

# base_url = "https://api.themoviedb.org/3/search/company?api_key=" + movie_key + "&page=1"



quary_parama = { 
    "api_key": movie_key,
}
response = requests.get(
    base_url,
    params=quary_parama
)
# val = response.json()["results"]
# print(json.dumps(response.json()["results"][:10], indent=4, sort_keys=True))
# val = json.dumps(response.json()["results"][:10])


# val2 = response.json()["results"][:17]
# for movie in val2:
#     if(movie['media_type'] != 'tv'):
#         print(movie['original_title'])
        # print()
#     print()
# print(json.dumps(response.json(), indent=4, sort_keys = True))
var = response.json()
# print(json.dumps(response.json(), indent=4, sort_keys = True))

print(json.dumps(response.json()["title"] , indent=4, sort_keys=True))
print(json.dumps(response.json()["tagline"] , indent=4, sort_keys=True))
genra = response.json()["genres"] 
for names in genra:
    print(names["name"])
print(json.dumps(response.json()["poster_path"] , indent=4, sort_keys=True))