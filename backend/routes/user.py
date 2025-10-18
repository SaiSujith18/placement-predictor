from flask import Blueprint, request, jsonify
from backend.extensions import mongo   # ✅ import mongo here

user_bp = Blueprint("user", __name__)

@user_bp.route("/", methods=["GET"])
def get_users():
    users = list(mongo.db.users.find({}, {"_id": 0}))  # hide _id for JSON
    return jsonify(users), 200

@user_bp.route("/", methods=["POST"])
def add_user():
    data = request.get_json()
    mongo.db.users.insert_one(data)
    return jsonify({"message": "User added successfully"}), 201
