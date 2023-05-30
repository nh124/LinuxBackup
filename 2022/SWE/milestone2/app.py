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
from curses.ascii import US
import os
import re
from click import UsageError
import flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import find_dotenv, load_dotenv
from sqlalchemy import null
from movie_wiki import movie_wiki
import random
# pylint: disable=line-too-long
from flask_login import login_user,login_required, logout_user, current_user, LoginManager, UserMixin
from flask_bcrypt import Bcrypt

from flask import Flask, render_template, redirect, url_for
# from flask_bootstrap import Bootstrap
import flask
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import InputRequired, Email, Length
from flask_sqlalchemy  import SQLAlchemy
# pylint: disable=line-too-long
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from dotenv import find_dotenv, load_dotenv
import os
load_dotenv(find_dotenv())
# pylint: disable=trailing-whitespace
app = flask.Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('secretKey')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('LOCAL_DATABASE_URL')
# bootstrap = Bootstrap(app)
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class Users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Fname = db.Column(db.String(50), nullable=False)
    Lname = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    # email  = db.Column(db.String(80), nullable=False)


@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))

class LoginForm(FlaskForm):
    username = StringField('username', validators=[InputRequired(), Length(min=4, max=15)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=8, max=80)])
    submit = SubmitField('login')# pylint: disable=trailing-whitespace

class RegisterForm(FlaskForm):
    Fname = StringField('Fname', validators=[InputRequired(), Length(min=4, max=15)])
    Lname = StringField('Lname', validators=[InputRequired(), Length(min=4, max=15)])
    username = StringField('username', validators=[InputRequired(), Length(min=4, max=15)])
    # email = StringField('email', validators=[InputRequired(), Length(min=4, max=15)])
    password = PasswordField('password', validators=[InputRequired(), Length(min=8, max=80)])
    submit = SubmitField('Register')


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName =  db.Column(db.String(100), nullable=False)# pylint: disable=trailing-whitespace
    MovieName = db.Column(db.String(100), nullable=False)
    comment = db.Column(db.String(200), nullable=False)

class Ratings(db.Model):
    id = db.Column(db.Integer, primary_key=True)# pylint: disable=trailing-whitespace
    MovieName = db.Column(db.String(100), nullable=False) 
    rating = db.Column(db.Integer, nullable=False)
# db.drop_all()
db.create_all()

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


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if flask.request.method == "POST":
        user = Users.query.filter_by(username=form.username.data).first()
        if user:
            if check_password_hash(user.password, form.password.data):
                login_user(user)
                return redirect(url_for('home'))

        return '<h1>Invalid username or password</h1>'
        #return '<h1>' + form.username.data + ' ' + form.password.data + '</h1>'

    return render_template('login.html', form=form)

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if flask.request.method == "POST":
        hashed_password = generate_password_hash(form.password.data, method='sha256')
        new_user = Users(
            Fname=form.Fname.data,
            Lname=form.Lname.data,
            username=form.username.data,# pylint: disable=trailing-whitespace
            password=hashed_password,
        )
        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for('login'))
        #return '<h1>' + form.username.data + ' ' + form.email.data + ' ' + form.password.data + '</h1>'
    return render_template('register.html', form=form)

@app.route('/home', methods=['GET', 'POST'])
@login_required
def home():
    random_Movie = random.randint(0,7) # pylint: disable=invalid-name
    movieWikiInfo = movie_wiki(random_Movie) # pylint: disable=invalid-name
    if flask.request.method == "POST":
        data = flask.request.form
        comment = data["comment"]
        rating = data["rating"]

        CommentsInfo = Comments(
            userName = current_user.username,
            MovieName = movieWikiInfo[0],
            comment = comment
        )
        db.session.add(CommentsInfo)
        db.session.commit()
        ratingInfo = Ratings(
            MovieName = movieWikiInfo[0],
            rating = rating
        )
        db.session.add(ratingInfo)
        db.session.commit()# pylint: disable=trailing-whitespace 
        return flask.redirect(flask.url_for("home"))
    return render_template(
        'home.html', 
        movieWikiInfoLen = len(movieWikiInfo),# pylint: disable=trailing-whitespace
        movieWikiInfo = movieWikiInfo,
        comments = comments,
        sizeComment = sizeComment,
        ratings = ratings,
        average = average,
        name=current_user.username
    )

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/')
def index():
    return render_template('index.html')

app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=int(os.getenv('PORT', 8080)),
    debug=True
)
