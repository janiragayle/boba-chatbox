from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import app, db

    
with app.app_context():
    db.create_all()
    print("Database initialized successfully.")