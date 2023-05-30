"""Model for each class in database"""
from flask_login import UserMixin
from database import db
class Users(db.Model, UserMixin):
    """Defines each user of program, child of one-to-many relationship with chatrooms"""

    __tablename__ = "Users"
    id = db.Column(db.Integer, unique=True, primary_key=True)
    Email = db.Column(db.String(40), unique=True, nullable=False)
    Fname = db.Column(db.String(40), unique=False, nullable=False)
    Lname = db.Column(db.String(40), unique=False, nullable=False)
    Pnumber = db.Column(db.String(40), unique=False, nullable=False)
    skills = db.Column(db.String(200), unique=False, nullable=False)
    bio = db.Column(db.String(1000), unique=False, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=True)
    

    def __repr__(self):
        return f"{self.id}"