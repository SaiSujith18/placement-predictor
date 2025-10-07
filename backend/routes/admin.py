from flask import Blueprint, request, jsonify
from models.admin import AdminModel
from models.login_log import LoginLog
from models.feedback import Feedback
from models.user import User
from database import connect_db
import jwt
import datetime
from functools import wraps

# Connect to MongoDB
connect_db()

admin_bp = Blueprint("admin", __name__)
SECRET_KEY = "supersecretkey"  # Store in .env for production

# -------------------- Admin authentication decorator --------------------
def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error": "Missing token"}), 401
        try:
            jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except Exception:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated

# -------------------- Admin login route --------------------
@admin_bp.route("/login", methods=["POST"])
def admin_login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    admin = AdminModel.objects(username=username).first()
    if admin and admin.check_password(password):
        token = jwt.encode({
            "admin_id": str(admin.id),
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, SECRET_KEY, algorithm="HS256")
        return jsonify({"token": token}), 200
    return jsonify({"error": "Invalid credentials"}), 401

# -------------------- Get login logs --------------------
@admin_bp.route("/dashboard/logins", methods=["GET"])
@admin_required
def get_logins():
    logs = LoginLog.objects()
    return jsonify([log.serialize() for log in logs]), 200

# -------------------- Get user data --------------------
@admin_bp.route("/dashboard/data", methods=["GET"])
@admin_required
def get_data():
    users = User.objects()
    return jsonify([user.serialize() for user in users]), 200

# -------------------- Get feedbacks --------------------
@admin_bp.route("/dashboard/feedbacks", methods=["GET"])
@admin_required
def get_feedbacks():
    feedbacks = Feedback.objects()
    return jsonify([fb.serialize() for fb in feedbacks]), 200
