from mongoengine import Document, StringField, IntField, ListField

class User(Document):
    meta = {"collection": "users"}

    name = StringField(required=True, max_length=100)
    email = StringField(required=True, unique=True)
    age = IntField()
    skills = ListField(StringField())

    def serialize(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "email": self.email,
            "age": self.age,
            "skills": self.skills
        }
