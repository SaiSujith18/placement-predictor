from werkzeug.security import generate_password_hash, check_password_hash
from mongoengine import Document, StringField

class AdminModel(Document):
    meta = {"collection": "admins"}

    username = StringField(required=True, unique=True, max_length=50)
    password_hash = StringField(required=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize(self):
        return {"id": str(self.id), "username": self.username}
