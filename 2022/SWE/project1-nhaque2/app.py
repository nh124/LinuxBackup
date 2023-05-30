""" APP Class"""
import os
import random
import flask
from movie_wiki import movie_wiki
app = flask.Flask(__name__)

@app.route('/')
def index():
    """ Random Number generator for different API access"""
    random_Movie = random.randint(0,7) # pylint: disable=invalid-name
    movieWikiInfo = movie_wiki(random_Movie) # pylint: disable=invalid-name
    return flask.render_template(
        'index.html',
        movieWikiInfoLen = len(movieWikiInfo),
        movieWikiInfo = movieWikiInfo,
    )
# pylint: disable=invalid-envvar-default
app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=int(os.getenv('PORT', 8080)),
    debug=True
)
