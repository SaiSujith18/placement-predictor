from mongoengine import Document, StringField, DateTimeField
import datetime

class Feedback(Document):
    meta = {"collection": "feedbacks"}

    username = StringField(required=True)
    message = StringField(required=True)
    timestamp = DateTimeField(default=datetime.datetime.utcnow)

    def serialize(self):
        return {
            "id": str(self.id),
            "username": self.username,
            "message": self.message,
            "timestamp": self.timestamp.isoformat()
        }
