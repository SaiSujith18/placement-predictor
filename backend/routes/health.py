from flask import Blueprint, jsonify

# Blueprint for health check
health_bp = Blueprint("health", __name__)

@health_bp.route("/health", methods=["GET"])
def health_check():
    """
    Health check endpoint to verify backend status.
    """
    return jsonify({
        "status": "ok",
        "message": "Backend is healthy ✅"
    }), 200
