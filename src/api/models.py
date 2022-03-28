from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def serialize(self): #Sirve para tener un método que devuelva valores de usuario que normalmente queremos consultar
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
