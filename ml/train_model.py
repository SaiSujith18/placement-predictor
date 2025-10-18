import os
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix

# ========================
# Paths
# ========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

data_path = os.path.join(
    r"C:\Users\SAISUJITH\OneDrive\Desktop\placement-predictor\data\processed",
    "placement_prediction.csv")

model_dir = os.path.join(BASE_DIR, "ml", "models")
model_path = os.path.join(model_dir, "placement_predictor.joblib")
scaler_path = os.path.join(model_dir, "scaler.joblib")

os.makedirs(model_dir, exist_ok=True)

# ========================
# Load Dataset
# ========================
placement_df = pd.read_csv(data_path)

features = [
    "cgpa", "iq", "internship", "projects", 
    "training", "technical", "communication"
]
X = placement_df[features]
y = placement_df["placement"]

# ========================
# Standardize Features
# ========================
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# ========================
# Train/Test Split
# ========================
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)

# ========================
# Train Logistic Regression
# ========================
model = LogisticRegression(class_weight="balanced", max_iter=1000)
model.fit(X_train, y_train)

# ========================
# Evaluation
# ========================
y_pred = model.predict(X_test)
print("=== Training Report ===")
print(classification_report(y_test, y_pred))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

# ========================
# Save Model + Scaler
# ========================
joblib.dump(model, model_path)
joblib.dump(scaler, scaler_path)

print(f"✅ Model and scaler saved in {model_dir}")

# ========================
# Load Model + Scaler (Absolute Path)
# ========================
model = joblib.load(model_path)
scaler = joblib.load(scaler_path)

print("✅ Model and scaler loaded successfully")
