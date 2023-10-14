"""Backend managing user and making necessary queties"""
import os
import random
from flask import Flask, redirect, url_for, render_template, request, flash, jsonify
from dotenv import find_dotenv, load_dotenv
from flask_cors import CORS, cross_origin

from flask_login import (
    login_user,
    login_required,
    logout_user,
    current_user,
    LoginManager,
)
from werkzeug.security import generate_password_hash, check_password_hash
from twilio.rest import Client
from models import Users
from database import db


load_dotenv(find_dotenv())


app = Flask(__name__)
CORS(app)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
# app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("LOCAL_DATABASE_URL")
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:root@localhost/playerMatching"
account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
VERIFY_SERVICE_SID = os.getenv("VERIFY_SERVICE_SID")
client = Client(account_sid, auth_token)


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


@login_manager.user_loader
def load_user(user_id):
    """loads the current user signed in"""
    return Users.query.get(int(user_id))


db.init_app(app)
with app.app_context():
    db.create_all()
    user = Users.query.all()


def send_varification_code(phone):
    """sends varification code to user via phone number"""
    verification = client.verify.services(VERIFY_SERVICE_SID).verifications.create(
        to=phone, channel="sms"
    )
    return verification.status


def check_verification_token(phone, token):
    """checks varification code of user via phone number"""
    verification_check = client.verify.services(
        VERIFY_SERVICE_SID
    ).verification_checks.create(to=phone, code=token)
    if verification_check.status == "approved":
        return True
    # elif verification_check.status == "pending":
    return False


@app.route("/login", methods=["GET", "POST"])
def login():
    """Login"""
    if request.method == "POST":
        Email = request.json["Email"]
        password = request.json["password"]
    if request.method == "POST":
        login_current_user = Users.query.filter_by(Email=Email).first()
        if login_current_user:
            if check_password_hash(login_current_user.password, password):
                login_user(login_current_user)
                return redirect(url_for("home"))
            return jsonify({"message": "Unauthorized"}), 401
        return jsonify({"message": "Bad Request"}), 400

    return jsonify({"message": "OK"}), 200


@app.route("/getAllUsers", methods=["GET"])
def allUsers():
    list_of_users = []
    for ind in user:
        userDict = {}
        userDict = {"name": ind.Fname + " " + ind.Lname, "skills": ind.skills, "bio": ind.bio}
        list_of_users.append(userDict)
    return jsonify(list_of_users)

@app.route("/register", methods=["POST"])
def register():
    """registration"""
    # pylint: disable=no-member
    if request.method == "POST":
        Fname = request.json["Fname"]
        Lname = request.json["Lname"]
        Email = request.json["Email"]
        bio = request.json["bio"]
        Pnumber = request.json["phone"]
        password = request.json["password"]
        skills = request.json["skills"]

        hashed_password = generate_password_hash(password, method="sha256")
        user_exists = Users.query.filter_by(Email=Email).first()
        if user_exists:
            flash("This user already exsists!")
        new_user = Users(
            Fname=Fname,
            Lname=Lname,
            Email=Email,
            Pnumber=Pnumber,
            bio=bio,
            skills=skills,
            password=hashed_password,
        )
        db.session.add(new_user)
        db.session.commit()
        phone = "+1" + Pnumber
        send_varification_code(phone)
        return redirect(url_for("varification"))
    return jsonify({"message": "created"}), 201


def random_users():
    """generates random users"""
    random_user = random.choice(user)
    return random_user


@app.route("/varification", methods=["GET", "POST"])
def varification():
    """Route to varify users"""
    if request.method == "POST":
        data = request.form
        phone = data["phone"]
        varification_data = data["varification"]
        phone = "+1" + phone
        status = check_verification_token(phone, varification_data)
        if status:
            return redirect(url_for("login"))
        flash("Wrong varification code")
    return render_template("varification.html")

def getAllUserNamesAndSkills(user, current_user_email, current_user_skills):
    list_of_users = []
    for ind in user:
        match = 0
        if(ind.Email != current_user_email):
            currIndSkill = [skLower.lower() for skLower in ind.skills.split(",")]
            for sk in currIndSkill:
                if(sk in current_user_skills):
                    match+=1
                    if(match == 3):
                        userDict = {"name": ind.Fname + " " + ind.Lname, "skills": ind.skills, "bio": ind.bio}
                        list_of_users.append(userDict)
    return list_of_users

@app.route("/home", methods=["GET", "POST"])
@login_required
def home():
    """Dashboard"""
    current_user_info = {}
    current_user_name = current_user.Fname + " " + current_user.Lname
    current_user_skills_not_serialized = current_user.skills.split(",")
    current_user_skills_serialized = [data.lower() for data in current_user_skills_not_serialized]
    current_user_info = {"name": current_user_name, "skills": current_user_skills_serialized, "email" : current_user.Email}

    match = getAllUserNamesAndSkills(user, current_user.Email, current_user_skills_serialized)
    
    return render_template(
        "home.html",
        currentUser=current_user_info["name"],
        match=match,
    )

@app.route("/logout")
@login_required
def logout():
    """logout"""
    logout_user()
    return redirect(url_for("index"))


@app.route("/")
def index():
    """stating page"""
    return render_template("index.html")

# pylint: disable=invalid-envvar-default
if __name__ == "__main__":
    app.run(debug=True)
