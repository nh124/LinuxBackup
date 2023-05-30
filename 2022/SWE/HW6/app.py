import os
import flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import find_dotenv, load_dotenv
from sqlalchemy import null

load_dotenv(find_dotenv())


app = flask.Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class FavoriteMovie(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    movie = db.Column(db.String(120), nullable=False)   

db.create_all()
FM = FavoriteMovie.query.all()
num_movies = len(FM)

@app.route('/add', methods=["POST"])
def add():
    i = 0
    if flask.request.method == "POST":
        data = flask.request.form
        new_movie = FavoriteMovie(movie=data["movie"])
        # db.session.add(new_movie)
        # db.session.commit()
        result = db.session.query(FavoriteMovie).filter(FavoriteMovie.movie == new_movie.movie)
        # return flask.redirect(flask.url_for("index"))
        dup = ""
        for row in result:
            dup = str(row.movie)
        if(dup != ""):
            return flask.redirect(flask.url_for("index"))
        else:
            db.session.add(new_movie)
            db.session.commit()
        return flask.redirect(flask.url_for("index"))
@app.route('/delete/<int:delete_id>', methods=["POST"])
def delete(delete_id):
    fdelete = FavoriteMovie.query.get_or_404(delete_id)
    db.session.delete(fdelete)
    db.session.commit()
    return flask.redirect(flask.url_for("index"))
@app.route("/")
def index():
    FM = FavoriteMovie.query.all()   
    return flask.render_template(
        'index.html',
        num_movies = num_movies,
        FM = FM,
    )
app.run(debug=True)