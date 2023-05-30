from dotenv import load_dotenv
import os

load_dotenv()


class ApplicationConfig:

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    # SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")
    # Point SQLAlchemy to your Heroku database
    SQLALCHEMY_DATABASE_URI = os.getenv("DB")
    # Gets rid of a warning
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True
    SECRET_KEY = os.getenv("secret_key")
