from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from ..forms.update_user_form import UpdateUserForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id, username, email, hashed_password, date_of_birth , about, profile_pic):
    """
    Update a user by their ID number
    """
    form = UpdateUserForm() #ToDo make the UpdateUserForm in forms folder
    form['csrf_token'].data = request.cookies['csrf_token']
    errors = {}
    user = User.query.get(id)

    if username and len(username) < 40:
        user['username'] = username
    elif username:
        errors['username'] = 'Username must be less than 40 characters'

    if email and len(email) < 255:
        user['email'] = email
    elif email:
        errors['email'] = email

    if hashed_password:
        user['hashed_password'] = hashed_password

    if date_of_birth:
        user['date_of_birth'] = date_of_birth

    if about and len(about) < 2000:
        user['about'] = about
    elif about:
        errors['about'] = 'About must less than 200 characters'

    if profile_pic:
        user['profile_pic'] = profile_pic

    db.commit()
    return user.to_dict()
