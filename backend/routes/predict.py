from flask import Blueprint, request, jsonify
from ml import predictor  # ensure correct path

predict_bp = Blueprint("predict", __name__)

@predict_bp.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Invalid or missing JSON in request body"}), 400

    features = data.get("features", {})
    skills = data.get("skills", [])
    role = data.get("role", "")

    result = predictor.predict_placement(features, skills, role)
    return jsonify(result)
