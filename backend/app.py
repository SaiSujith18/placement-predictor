from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from ml import predictor  # this now works because predictor.py is fixed

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask API is running!"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)
        features = data.get("features", {})
        skills = data.get("skills", [])
        role = data.get("role", "")

        if not features:
            return jsonify({"error": "Missing 'features' in request"}), 400

        result = predictor.predict_placement(features, skills, role)
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
