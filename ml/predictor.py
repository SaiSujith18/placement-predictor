import joblib
import pandas as pd
import os
from ml.recommender import best_role_skills_match

MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "placement_predictor.joblib")
SCALER_PATH = os.path.join(os.path.dirname(__file__), "models", "scaler.joblib")

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    print("✅ Model and scaler loaded successfully.")
except Exception as e:
    print("❌ Error loading model or scaler:", e)
    model = None
    scaler = None


def predict_placement(user_features, user_skills, user_role):
    try:
        if model is None or scaler is None:
            return {"error": "Model or scaler not loaded"}

        required_features = [
            "cgpa", "iq", "internship", "projects", "training", "technical", "communication",
            "stream_civil engineering",
            "stream_computer science and design",
            "stream_computer science and engineering",
            "stream_computer science in aiml",
            "stream_computer science in data science",
            "stream_electrical and electronics engineering",
            "stream_electrical engineering",
            "stream_electronics and communication engineering",
            "stream_information technology",
            "stream_mechanical engineering",
            "stream_mkt&fin",
            "stream_mkt&hr",
            "stream_other"
        ]

        clean_features = {feat: user_features.get(feat, 0) for feat in required_features}
        input_df = pd.DataFrame([clean_features], columns=required_features)

        input_scaled = scaler.transform(input_df)

        ml_pred = model.predict(input_scaled)[0]
        ml_proba = round(model.predict_proba(input_scaled)[0][1] * 100, 2)

        matched_role, matched_skills, skills_score, recommended = best_role_skills_match(user_skills, user_role)

        return {
            "Placement Prediction": f"{ml_proba}%",
            "Placement Class": "Placed" if ml_pred == 1 else "Not Placed",
            "Matched Role": matched_role,
            "Matched Skills": matched_skills,
            "Skills Match Score": skills_score,
            "Recommended Skills": recommended
        }

    except Exception as e:
        return {"error": str(e)}
