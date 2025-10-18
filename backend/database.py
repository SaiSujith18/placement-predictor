from mongoengine import connect, connection
from flask import jsonify
from mongoengine import connect


def connect_db():
    try:
        connect(
            db="your_db",      # Change this to your database name
            host="localhost",  # Change host if needed
            port=27017
        )
        connection.get_db().command("ping")
        print("✅ MongoDB connected")
    except Exception as e:
        print("❌ MongoDB connection failed:", e)
