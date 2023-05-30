"""Backend"""
import os
import flask
from model import Users
from sqlalchemy import PrimaryKeyConstraint
from database import db
from flask import session
from api_setup import get_data
import flask_login as fl
from werkzeug.security import generate_password_hash, check_password_hash
from config import ApplicationConfig
from flask_socketio import SocketIO, send

app = flask.Flask(__name__)
app.config.from_object(ApplicationConfig)

db.init_app(app)
with app.app_context():
    db.create_all()
    user = Users.query.all()

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DB")
print("=======",app.config["SQLALCHEMY_DATABASE_URI"])
if app.config["SQLALCHEMY_DATABASE_URI"].startswith("postgres://"):
    app.config["SQLALCHEMY_DATABASE_URI"] = app.config[
        "SQLALCHEMY_DATABASE_URI"
    ].replace("postgres://", "postgresql://")
login_manager = fl.LoginManager(app)
login_manager.login_view = "login"
login_manager.init_app(app)
socketIo = SocketIO(app, cors_allowed_origins="*")


bp = flask.Blueprint(
    "bp",
    __name__,
    template_folder="./static/react",
)


@app.route("/get_all_restaurants", methods=["GET"])
def get_all_restaurants():
    """Database classes + table"""
    # rest_list = db.engine.execute(f""" select * from "restaurant"  """).all()
    # rest_name = [rest1, rest2, ...]


@app.route(
    "/get_business_data/<name>", methods=["GET"]
)  # name is a value (restaurant's name)
def get_business_data(name):
    """Usage: localhost:5000/get_business_data/cafe lucia"""
    return get_data(name)


@app.route("/login", methods=["POST", "GET"])
def login():
    """Login"""

    gsu_id = flask.request.json["gsu_id"]
    password = flask.request.json["password"]
    is_user = Users.query.filter_by(gsu_id=gsu_id).first()
    if not is_user:
        return flask.jsonify({"error": "Not Found"}), 404
    else:
        if not check_password_hash(is_user.password, password):
            return flask.jsonify({"error": "Unauthorized"}), 401

    session["user"] = {is_user.f_name }+" "+{is_user.l_name }
    return flask.jsonify({"id": is_user.id, "username": is_user.gsu_id})

@app.route("/user")
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


@app.route("/restaurant", methods=["POST", "GET"])
@fl.login_required
def restaurant():
    """PLACEHOLDER for the route to the restaurant page coming from a SEARCH bar"""

    return flask.render_template("restaurant.html")


# PLACEHOLDER for the route to the profile page coming from a button on main page


@app.route("/profile", methods=["POST", "GET"])
def profile():
    """Profile"""
    return flask.render_template("profile.html")


# route for serving React page
@bp.route("/")
@fl.login_required
def index():
    """PLACEHOLDER for the route to the chat page (REACT)
    ~coming from a button
    SHOULD BE A REACT PAGE"""
    # NB: DO NOT add an "index.html" file in your normal templates folder
    # Flask will stop serving this React page correctly
    return flask.render_template("index.html")


# CREATED NEW ROUTE for serving Flask page
@bp.route("/chat", methods=["POST"])
@fl.login_required
def chat():  # should return a JSON file with a fun fact in it
    """Chat"""
    chats = ["Hi there! It is our chat page"]
    return flask.jsonify(chats)


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

    # new_chatroom = Chatroom(name=name)
    # db.session.add(new_chatroom)
    # db.session.commit()

@app.route("/fetch_yelp")
def yelp_call():
    data = get_data()
    attributes = ["id", "name", "display_location", "rating", "price", "image_url"]
    # new_restaurant = {}
    for biz in data:
        ls = {}
        for a in attributes:
            if a not in biz.keys():
                ls[a] = "None"
            else:
                ls[a] = biz[a]
        # new_restaurant.append(Restaurant(
        #     id=ls["id"],
        #     name=ls["name"],
        #     address=ls["display_location"],
        #     rating=ls["rating"],
        #     price=ls["price"],
        #     image=ls["image_url"],
        # ))
    return flask.jsonify(data)


@bp.route("/get_restaurant", methods=["GET", "POST"])
@fl.login_required
def get_restaurant():
    yelp_call()
    if flask.request.method == "POST":
        name = flask.request.json["name"]

    cur_rest = {"restaurant_name":""}
    # Restaurant.query.filter_by(name=name).first()

    return flask.jsonify(cur_rest)

@app.route("/logout", methods=["GET"])
def logout():
    session.pop("user", None)
    return flask.jsonify("logout Successful")

# def yelp_call():
#     data = get_data()
#     attributes = ["id", "name", "display_location", "rating", "price", "image_url"]
#     for biz in data:
#         ls = {}
#         for a in attributes:
#             if a not in biz.keys():
#                 ls[a] = "None"
#             else:
#                 ls[a] = biz[a]
#         new_restaurant = Restaurant(
#             id=ls["id"],
#             name=ls["name"],
#             address=ls["display_location"],
#             rating=ls["rating"],
#             price=ls["price"],
#             image=ls["image_url"],
#         )


@bp.route("/search_bar", methods=["GET", "POST"])
@fl.login_required
def search_bar():

    if flask.request.method == "POST":
        rest_name = flask.request.json["restaurantName"]

    data = get_data(rest_name)

    return flask.jsonify(data)


# app.register_blueprint(bp)

if __name__ == "__main__":
    socketIo.run(
        app
    )
    
# Please make sure the backend code work. While connecting the fronend to the backend I ran into a lot of problem.
# This doesn't only include compiling error. Please make sure each route has no error in it.
# Hear is great tool for testing the backend: Postman.
# You can use the data below to test your the register route. Use similar types of test cases to test each and everyroute in particular thouse of which require
# a user input
#     "l_name": "lastname",
#     "gsu_id" : "342232332",
#     "level": "undergrad",
#     "password": "1234",
#     "primary_major" : "Computer science",
# }
