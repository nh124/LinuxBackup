"""Backend managing user and making necessary queties"""
import os
import random
from flask import Flask, redirect, url_for, render_template, request, flash
from dotenv import find_dotenv, load_dotenv
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
from funfact import res
from generate import astro


load_dotenv(find_dotenv())


app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("secretKey")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("LOCAL_DATABASE_URL")
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
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
        data = request.form
        username = data["username"]
        password = data["password"]
    if request.method == "POST":
        login_current_user = Users.query.filter_by(username=username).first()
        if login_current_user:
            if check_password_hash(login_current_user.password, password):
                login_user(login_current_user)
                return redirect(url_for("factOftheDay"))
            flash("Incorrect Password")
        flash("Incorrect Username")

    return render_template("login.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """registration"""
    # pylint: disable=no-member
    if request.method == "POST":
        data = request.form
        first_name = data["Fname"]
        last_name = data["Lname"]
        username = data["username"]
        phone = data["phone"]
        password = data["password"]

        hashed_password = generate_password_hash(password, method="sha256")
        user_exists = Users.query.filter_by(username=username).first()
        if user_exists:
            flash("This user already exsists!")

        new_user = Users(
            Fname=first_name,
            Lname=last_name,
            username=username,
            Pnumber=phone,
            password=hashed_password,
        )
        db.session.add(new_user)
        db.session.commit()
        phone = "+1" + phone
        send_varification_code(phone)
        return redirect(url_for("varification"))
    return render_template("register.html")


def random_users():
    """generates random users"""
    random_user = random.choice(user)
    return random_user

@app.route("/factOftheDay")
@login_required
def factOftheDay():
    fun_fact = res()
    return render_template(
        "factOftheDay.html",
        fun_fact=fun_fact
    )
@app.route('/interestingInformation')
def interestingInformation():
    return render_template(
        "interestingInformation.html",
        astro=astro()
    )


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


@app.route("/logout")
@login_required
def logout():
    """logout"""
    logout_user()
    return redirect(url_for("index"))


@app.route("/", methods=["GET", "POST"])
def index():
    """stating page"""
    fun_fact = res()
    return render_template(
        "home.html",
        fun_fact=fun_fact
    )

# pylint: disable=invalid-envvar-default
app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=int(os.getenv('PORT', 8080)),
    debug=True
)

