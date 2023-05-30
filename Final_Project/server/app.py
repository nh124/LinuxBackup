"""Backend"""
import os
import flask
from model import Users
from database import db
from flask import session
from api_setup import get_data
import flask_login as fl
from werkzeug.security import generate_password_hash, check_password_hash
from config import ApplicationConfig
from flask_socketio import SocketIO, send
import json


app = flask.Flask(__name__)
app.config.from_object(ApplicationConfig)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:s1423969871@localhost/campus_connect_flask"
app.secret_key = "ThisIsASecretKey"
login_manager = fl.LoginManager(app)
login_manager.login_view = "login"
login_manager.init_app(app)
socketIo = SocketIO(app, cors_allowed_origins="*")



with app.app_context():
    db.init_app(app)
    db.create_all();

bp = flask.Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)


@app.route("/login", methods=["POST", "GET"])
def login():
    """Login"""

    gsu_id = flask.request.json["gsu_id"]
    password = flask.request.json["password"]
    if gsu_id == "":
        return flask.jsonify({"error": "Unauthorized"}), 402
    is_user = Users.query.filter_by(gsu_id=gsu_id).first()
    if not is_user:
        return flask.jsonify({"error": "Not Found"}), 404
    else:
        if not check_password_hash(is_user.password, password):
            return flask.jsonify({"error": "Unauthorized"}), 401
    session["user"]  = f"{is_user.f_name} {is_user.l_name}"
    session["gsu_id"] = f"{is_user.gsu_id}"
    return flask.jsonify({"id": is_user.user_id, "username": is_user.gsu_id})


@app.route("/user", methods=["GET"])
def user():
    if "user" in session:
        user = session["user"]
        return flask.jsonify(user)
    else:
        return flask.jsonify({"error": "Unauthorized"}), 401


@login_manager.user_loader
def load_user(user_id):
    """Load user for login manager"""
    return Users.query.get(int(user_id))


@socketIo.on("message")
def handleMessage(msg):
    print(msg)
    send(msg, broadcast=True)





@app.route("/getAllUserDetails", methods=["GET"])
def loadAllUsers():
    content = {}
    users = []
    if "user" in session:
        gsu_id = session["gsu_id"]
        currentUser = Users.query.filter_by(gsu_id=gsu_id).first()
        content = {
            "id": currentUser.user_id,
            "first_name" : f"{currentUser.f_name}",
            "last_name" : f"{currentUser.l_name}",
            "level": f"{currentUser.l_name}",
            "primary_major": f"{currentUser.primary_major}",
            "alt_email": f"{currentUser.alt_email}",
            "phone_number": f"{currentUser.phone}",
        }
        users.append(content)
    
    return flask.jsonify(users)

    
    
# register function implemented with hashing
@app.route("/register", methods=["GET", "POST"])
def register():
    """registration"""
    # pylint: disable=no-member
    # pylint: disable=unused-variable
    if flask.request.method == "POST":
        f_name = flask.request.json["f_name"]
        l_name = flask.request.json["l_name"]
        gsu_id = flask.request.json["gsu_id"]
        level = flask.request.json["level"]
        phone = flask.request.json["phone"]
        password = flask.request.json["password"]
        primary_major = flask.request.json["primary_major"]
        alt_email = flask.request.json["alt_email"]
    
        hashed_password = generate_password_hash(password, method="sha256")
        user_exists = Users.query.filter_by(gsu_id=gsu_id).first()
        if f_name == "" or l_name == "" or gsu_id == "" or level == "" or phone == "" or password == "" or primary_major == "" or alt_email == "":
            return flask.jsonify({"error": "Unauthorized"}), 402
        if user_exists:
            return flask.jsonify({"error": "Unauthorized"}), 401
        new_user = Users(
            f_name=f_name,
            l_name=l_name,
            gsu_id=gsu_id,
            level=level,
            primary_major=primary_major,
            phone=phone,
            alt_email=alt_email,
            password=hashed_password,
        )
        db.session.add(new_user)
        db.session.commit()
    return flask.jsonify({"message": "No Post Request"})
  
@bp.route("/new_chatroom", methods=["POST"])
@fl.login_required
def new_chatroom():
    existing_users = []
    if flask.request.method == "POST":
        name = flask.request.json["name"]
        users_to_add = flask.request.json["users_to_add"]

    ls_to_add = users_to_add.split(sep=",")
    for user in ls_to_add:
        user = user.replace(" ", "")
        user_exists = Users.query.filter_by(gsu_id=user).first()
        existing_users.append(user)



@app.route("/logout", methods=["GET"])
def logout():
    session.pop("user", None)
    return flask.jsonify("logout Successful")


@bp.route("/search_bar", methods=["GET", "POST"])
@fl.login_required
def search_bar():

    if flask.request.method == "POST":
        rest_name = flask.request.json["restaurantName"]

    data = get_data(rest_name)

    return flask.jsonify(data)


if __name__ == "__main__":
    socketIo.run(
        app
    )
    
