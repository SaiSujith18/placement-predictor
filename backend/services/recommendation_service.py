import os
import joblib
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

COMPANY_DATA_PATH = "ml/models/company_skill_data.joblib"

class RecommendationService:
    def __init__(self):
        if not os.path.exists(COMPANY_DATA_PATH):
            raise FileNotFoundError(f"Company data not found at {COMPANY_DATA_PATH}")
        data = joblib.load(COMPANY_DATA_PATH)
        self.company_matrix = data["matrix"]
        self.company_names = data["names"]
        self.skill_index = data["skills"]

    def _to_vector(self, skills):
        vec = np.zeros((1, len(self.skill_index)))
        for s in skills:
            if s in self.skill_index:
                vec[0, self.skill_index[s]] = 1
        return vec

    def recommend(self, data, top_k=10):
        skills = data.get("tech_skills", [])
        vec = self._to_vector(skills)
        if vec.sum() == 0:
            scores = self.company_matrix.sum(axis=1)
        else:
            scores = cosine_similarity(vec, self.company_matrix)[0]
        idx = np.argsort(scores)[::-1][:top_k]
        return [{"company": self.company_names[i], "score": float(scores[i])} for i in idx]
