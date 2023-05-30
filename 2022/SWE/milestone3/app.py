"""Function quarying data from wiki based on title"""
# pylint: disable=reimported
# pylint: disable=no-member
# pylint: disable=missing-class-docstring
# pylint: disable=too-few-public-method # pylint: disable=ungrouped-imports
# pylint: disable=invalid-name
# pylint: disable=bad-option-value
# pylint: disable=missing-function-docstring
# pylint: disable=redefined-outer-name
# pylint: disable=too-few-public-methods
# pylint: disable=unused-import
# pylint: disable=invalid-envvar-default
# pylint: disable=wrong-import-order
# pylint: disable=ungrouped-imports
#pylint: disable=no-else-return
#pylint: disable=unnecessary-comprehension
#pylint: disable=function-redefined

from calendar import c
import random # pylint: disable=reimported
from curses.ascii import US
import os
import re
from click import UsageError # pylint: disable=reimported
import flask # pylint: disable=reimported
from flask_sqlalchemy import SQLAlchemy
from dotenv import find_dotenv, load_dotenv
from sqlalchemy import null # pylint: disable=reimported
from movie_wiki import movie_wiki
from flask_login import (
    login_user,
    login_required,
    logout_user,
    current_user,
    LoginManager,
    UserMixin,
)
from flask_bcrypt import Bcrypt
from flask import Flask, render_template, redirect, url_for
import flask
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import InputRequired, Email, Length
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    login_required,
    logout_user,
    current_user,
)
from dotenv import find_dotenv, load_dotenv
import os

load_dotenv(find_dotenv())

app = flask.Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("secretKey")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("LOCAL_DATABASE_URL")
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


class Users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Fname = db.Column(db.String(50), nullable=False)
    Lname = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(200), nullable=False)


@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))


class LoginForm(FlaskForm):
    username = StringField(
        "username", validators=[InputRequired(), Length(min=4, max=15)]
    )
    password = PasswordField(
        "password", validators=[InputRequired(), Length(min=8, max=80)]
    )
    submit = SubmitField("login")  # pylint: disable=trailing-whitespace


class RegisterForm(FlaskForm):
    Fname = StringField("Fname", validators=[InputRequired(), Length(min=4, max=15)])
    Lname = StringField("Lname", validators=[InputRequired(), Length(min=4, max=15)])
    username = StringField(
        "username", validators=[InputRequired(), Length(min=4, max=15)]
    )
    # email = StringField('email', validators=[InputRequired(), Length(min=4, max=15)])
    password = PasswordField(
        "password", validators=[InputRequired(), Length(min=8, max=80)]
    )
    submit = SubmitField("Register")


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(
        db.String(100), nullable=False
    )  # pylint: disable=trailing-whitespace
    MovieName = db.Column(db.String(100), nullable=False)
    comment = db.Column(db.String(200), nullable=False)


class Ratings(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # pylint: disable=trailing-whitespace
    MovieName = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Integer, nullable=False)


users = Users.query.all()
comments = Comments.query.all()
ratings = Ratings.query.all()
currentUser = ""
size = len(users)
sizeComment = len(comments)
sizeRating = len(ratings)

average = 0
for rating in ratings:
    average += rating.rating
if size != 0:
    average /= sizeRating

db.create_all()

bp = flask.Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)


@bp.route("/comment", methods=["GET", "POST"])
def index():
    return flask.render_template("index.html")


app.register_blueprint(bp)


@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()

    if flask.request.method == "POST":
        user = Users.query.filter_by(username=form.username.data).first()
        if user:
            if check_password_hash(user.password, form.password.data):
                login_user(user)
                return redirect(url_for("home"))
            else:
                flask.flash("Wrong password!")
        else:
            flask.flash("Wrong Username!")

    return render_template("login.html", form=form)


@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegisterForm()
    if flask.request.method == "POST":
        hashed_password = generate_password_hash(form.password.data, method="sha256")
        new_user = Users(
            Fname=form.Fname.data,
            Lname=form.Lname.data,
            username=form.username.data,  # pylint: disable=trailing-whitespace
            password=hashed_password,
        )
        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for("login"))
    return render_template("register.html", form=form)


@app.route("/home", methods=["GET", "POST"])
@login_required
def home():
    random_Movie = random.randint(0, 7)  # pylint: disable=invalid-name
    movieWikiInfo = movie_wiki(random_Movie)  # pylint: disable=invalid-name
    if flask.request.method == "POST":
        data = flask.request.form
        comment = data["comment"]
        rating = data["rating"]

        CommentsInfo = Comments(
            userName=current_user.username, MovieName=movieWikiInfo[0], comment=comment
        )
        db.session.add(CommentsInfo)
        db.session.commit()
        ratingInfo = Ratings(MovieName=movieWikiInfo[0], rating=rating)
        if rating == "":
            flask.flash("Please enter Rating")
        elif rating not in [i for i in range(11)]:
            flask.flash("Please enter a valid Rating")
        else:
            db.session.add(ratingInfo)
            db.session.commit()  # pylint: disable=trailing-whitespace
        return flask.redirect(flask.url_for("home"))
    return render_template(
        "home.html",
        movieWikiInfoLen=len(movieWikiInfo),  # pylint: disable=trailing-whitespace
        movieWikiInfo=movieWikiInfo,
        comments=comments,
        sizeComment=sizeComment,
        ratings=ratings,
        average=average,
        name=current_user.username,
    )


def ser(Comments):
    return {"id": Comments.id, "comment": Comments.comment}


@app.route("/commentDisplay")
def randoming():
    # return flask.jsonify([*map(ser, Comments.query.all())])
    commenting = []
    for comment in comments:
        commenting.append(
            {"username": comment.userName, "comment": comment.comment, "id": comment.id}
        )
    return flask.jsonify(commenting)


@app.route("/ratingDisplay")
def rating():
    # return flask.jsonify([*map(ser, Comments.query.all())])
    ratings = []
    for rating in ratings:
        rating.append(
            {
                "rating": rating.rating,
            }
        )
    return flask.jsonify(ratings)


@app.route("/delete/<int:delete_id>", methods=["DELETE"])
def delete(delete_id):
    # delete = Comments.query.get_or_404(delete_id)
    delete = Comments.query.get(delete_id)
    db.session.delete(delete)
    db.session.commit()
    commenting = []
    for comment in comments:
        commenting.append(
            {
                "username": comment.userName,
                "comment": comment.comment,
            }
        )
    return flask.jsonify(commenting)


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("home"))


@app.route("/")
def index():
    return render_template("base.html")


app.run(debug=True)
