"""
| Backend
"""
from crypt import methods
import os
import random
from flask import Flask, request, session, jsonify
from model import Users, CommentsAndRating
from database import db
from werkzeug.security import generate_password_hash, check_password_hash
from config import ApplicationConfig
from flask_socketio import SocketIO, send
from flask_cors import CORS, cross_origin
from movie import movieRetrieve
from popularMovie import popularMovie, searchMovie


app = Flask(__name__, static_folder="../client/build", static_url_path='')
app.config.from_object(ApplicationConfig)
CORS(app)
db.init_app(app)
with app.app_context():
    db.create_all()
    user = Users.query.all()

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DB")
socketIo = SocketIO(app, cors_allowed_origins="*")

@app.route("/popularMovie", methods=["POST"])
def get_popular_movie():
    number = request.json["number"]
    # movieKey = popularMovie(number)[:,0]
    # movieValue = popularMovie(number)[:,1]
    # res = {movieKey[i]: movieValue[i] for i in range(len(movieKey))}
    return jsonify(popularMovie(number))

@app.route("/searchedMovie", methods=["POST"])
def get_searched_movie():
    searching = request.json["searching"]
    searchKey = searchMovie(searching)[:,0]
    searchVal = searchMovie(searching)[:,1]
    res = {searchKey[i]: searchVal[i] for i in range(len(searchKey))}
    return jsonify(res)

@app.route("/image", methods=["GET"])
def get_image():
    """
    | Retrieves random movies image from api
    """
    rand = random.randint(0, 7)
    movie_retrieval = movieRetrieve(rand)
    return jsonify(movie_retrieval[len(movie_retrieval)-1])

def get_random_movie():
    """
    | Retrieves random movies from api
    """
    rand = random.randint(0, 7)
    movie_retrieval = movieRetrieve(rand)
    return movie_retrieval

@app.route("/login", methods=["POST", "GET"])
def login():
    """
    | Authenticates users with username and password
    """
    username = request.json["username"]
    password = request.json["password"]
    is_user = Users.query.filter_by(username=username).first()
    if not is_user:
        return jsonify({"error": "Not Found"}), 404
    if not check_password_hash(is_user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    session["user"] = f"{is_user.f_name } {is_user.l_name }"
    return jsonify({"id": is_user.id, "username": is_user.username})

@app.route("/user")
def get_user():
    """
    | Gets The current user login based on the session
    """
    if "user" in session:
        curr_user = session["user"]
        return jsonify(curr_user)
    return jsonify({"error": "Unauthorized"}), 401

def load_user(user_id):
    """
    | Load user for login manager
    """
    if "user" in session:
        return Users.query.get(int(user_id))
    return jsonify({"error": "Unauthorized"}), 401


@socketIo.on("message")
def handle_message(msg):
    """
    | Runs on a socket server to handle message sending and retrieving
    """
    print(msg)
    send(msg, broadcast=True)


@app.route("/profile", methods=["POST", "GET"])
def profile():
    """
    | Will lets user change profile based on preference
    """
    return jsonify("profile")


# route for serving React page
@app.route("/")
@cross_origin()
def serve():
    """
    | Base route to handle app deployment
    """
    return app.send_static_file('index.html')

@app.route("/ratingAndReview", methods=["POST"])
@cross_origin()
def r_r():
    """
    | Comment and Rating service
    """
    # pylint: disable=no-member
    if "user" in session:
        curr_user = session["user"]
        movie = get_random_movie()[0]
        comment = request.json["comment"]
        rating = request.json["rating"]
        newcomment = CommentsAndRating(
            userName=curr_user,
            MovieName=movie,
            comment=comment,
            rating=rating
        )
        db.session.add(newcomment)
        db.session.commit()
        return jsonify({"Success": "comment recorded"}), 200
    return jsonify({"error": "Unauthorized"}), 401


# register function implemented with hashing
@app.route("/register", methods=["GET", "POST"])
def register():
    """
    | register user based on a few credential
    """
    # pylint: disable=no-member
    if request.method == "POST":
        f_name = request.json["f_name"]
        l_name = request.json["l_name"]
        username = request.json["username"]
        email = request.json["email"]
        phone = request.json["password"]
        password = request.json["password"]

        hashed_password = generate_password_hash(password, method="sha256")
        user_exists = Users.query.filter_by(username=username).first()
        if user_exists:
            return jsonify({"error": "Unauthorized"}), 401
        new_user = Users(
            f_name=f_name,
            l_name=l_name,
            username=username,
            email=email,
            phone=phone,
            password=hashed_password,
        )
        db.session.add(new_user)
        db.session.commit()
    return jsonify({"message": "No Post Request"})

@app.route("/logout", methods=["GET"])
def logout():
    """
    | Will remove the user from the seesion
    """
    session.pop("user", None)
    return jsonify("logout Successful")

if __name__ == "__main__":
    # pylint: disable=invalid-envvar-default
    app.run(debug=True)
    # print(get_popular_movie(10))
    # socketIo.run(
    #     app,
    #     host=os.getenv('IP', '0.0.0.0'),
    #     port=os.getenv('PORT', 8080),
    #     debug=True
    # )
