from flask import Blueprint, request, jsonify
import sqlite3
import os
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

auth_bp = Blueprint("auth", __name__)

# Path to SQLite DB
DB_PATH = os.path.join(os.path.dirname(__file__), "..", "users.db")

# Secret key for JWT (use environment variable in production)
JWT_SECRET = "your_secret_key_here"
JWT_ALGORITHM = "HS256"
JWT_EXP_DELTA_SECONDS = 3600  # 1 hour


# Helper: connect to SQLite
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# Register endpoint
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not (name and email and password):
        return jsonify({"error": "All fields are required"}), 400

    try:
        with get_db() as conn:
            cur = conn.cursor()
            cur.execute("SELECT * FROM users WHERE email=?", (email,))
            if cur.fetchone():
                return jsonify({"error": "Email already exists"}), 400

            hashed_pw = generate_password_hash(password)
            cur.execute(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                (name, email, hashed_pw),
            )
            conn.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Login endpoint with JWT
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    try:
        with get_db() as conn:
            cur = conn.cursor()
            cur.execute("SELECT * FROM users WHERE email=?", (email,))
            user = cur.fetchone()

        if user and check_password_hash(user["password"], password):
            payload = {
                "user_id": user["id"],
                "email": user["email"],
                "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=JWT_EXP_DELTA_SECONDS),
            }
            token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

            return jsonify({"message": "Login successful", "token": token}), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Token validation helper
@auth_bp.route("/validate-token", methods=["POST"])
def validate_token():
    token = request.json.get("token")
    if not token:
        return jsonify({"error": "Token is missing"}), 400

    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return jsonify({"message": "Token is valid", "user": decoded}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401
