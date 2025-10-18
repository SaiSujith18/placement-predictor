from mongoengine import Document, StringField, DateTimeField
import datetime

class LoginLog(Document):
    meta = {"collection": "login_logs"}

    username = StringField(required=True)
    timestamp = DateTimeField(default=datetime.datetime.utcnow)

    def serialize(self):
        return {
            "id": str(self.id),
            "username": self.username,
            "timestamp": self.timestamp.isoformat()
        }
