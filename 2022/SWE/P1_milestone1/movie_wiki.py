"""Wiki API """
import requests
from movie import movieRetrieve


def movie_wiki(random_Movie):  # pylint: disable=invalid-name
    """Function quarying data from wiki based on title"""
    movieData = movieRetrieve(random_Movie)  # pylint: disable=invalid-name
    query = movieData[0]
    url = 'https://en.wikipedia.org/w/api.php'
    params = {
      'action' : 'opensearch',
      'namespace' : '0',
      'search' : query,
      'limit': '5',
      'format': 'json'
    }
    data = requests.get(url, params=params).json()
    movieData.append(data[3][0])
    return movieData
