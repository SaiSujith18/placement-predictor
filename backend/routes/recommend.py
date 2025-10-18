# from flask import Blueprint, request, jsonify
# from services.recommendation_service import RecommendationService  # ✅ Absolute import

# recommend_bp = Blueprint("recommend", __name__)

# # Initialize RecommendationService safely
# try:
#     rec_service = RecommendationService()
# except Exception as e:
#     rec_service = None
#     print(f"[WARN] RecommendationService failed to initialize: {e}")


# @recommend_bp.route("/recommend", methods=["POST"])
# def recommend():
#     if rec_service is None:
#         return jsonify({"error": "Recommendation service not available."}), 500

#     data = request.get_json(silent=True) or {}
#     try:
#         result = rec_service.recommend(data)
#         return jsonify(result), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400
