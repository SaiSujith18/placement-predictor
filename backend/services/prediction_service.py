import os
import joblib

class PredictionService:
    def __init__(self):
        try:
            base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "ml", "models"))
            model_path = os.path.join(base_path, "placement_predictor_v1.joblib")
            scaler_path = os.path.join(base_path, "scaler.joblib")

            print(f"[DEBUG] Model path: {model_path}")
            print(f"[DEBUG] Scaler path: {scaler_path}")

            if not os.path.isfile(model_path):
                raise FileNotFoundError(f"Model file not found: {model_path}")
            if not os.path.isfile(scaler_path):
                raise FileNotFoundError(f"Scaler file not found: {scaler_path}")

            self.model = joblib.load(model_path)
            self.scaler = joblib.load(scaler_path)

            print("[INFO] Model and scaler loaded successfully.")
        except Exception as e:
            print(f"[ERROR] Failed to load PredictionService: {e}")
            raise
