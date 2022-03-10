"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route("/login", methods =["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email = email, password = password).first()

    if not user:
        return jsonify("User do not exist"), 401

        

    access_token = create_access_token(identity = user.id) #Crea un toquen que se almacena en la api, para cuando le llegue uno desde el front poder validarlo (los tokens caducan, y se puede modificar este tiempo)

    return jsonify({
        "email": email,
        "token": access_token
    })

@api.route("/singup", methods = ["POST"])
def singup():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User(email = email, password = password, is_active = True)
    db.session.add(user)
    db.session.commit()

    return jsonify("Usuario creado")

@api.route("/private", methods = ["GET"])
@jwt_required()
def private():

    current_user_id = get_jwt_identity() #Devuelve el id del usuario (en este caso el id) a partir de su "identity"
    user = User.query.filter_by(id = current_user_id).first() #Ojo, aquí no se recuperan los datos del usuario, hay que accerder a él a traves de funciones de la clase de su modelo, como serialize

    user = user.serialize() #Para recuperar los datos del usuario que necesitamos

    print("El id de usuario es: %d" % current_user_id)
    print("El email del usuario es: %s" % user.get("email"))
    return jsonify(
     {
         "id": user.get("id"),
         "email": user.get("email")
     }
    )

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200