"""Database"""
from database import db
class Users(db.Model):
    # pylint: disable=no-member
    # pylint: disable=too-few-public-methods
    """
    | User database table
    """
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    f_name = db.Column(db.String(50), nullable=False)
    l_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(200), nullable=False)

class CommentsAndRating(db.Model):
    # pylint: disable=no-member
    # pylint: disable=too-few-public-methods
    """
    | Comments database table
    """
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(
        db.String(100), nullable=False
    )
    MovieName = db.Column(db.String(100), nullable=False)
    comment = db.Column(db.String(200), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
