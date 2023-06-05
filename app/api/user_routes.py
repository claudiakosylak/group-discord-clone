from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from ..forms.update_user_form import UpdateUserForm
from email_validator import validate_email
import re
from app.api.AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from datetime import datetime

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
def update_user(id, username, email, password, date_of_birth, about, profile_pic):
    """
    Update a user by their ID number
    """
    form = UpdateUserForm() #ToDo make the UpdateUserForm in forms folder
    form['csrf_token'].data = request.cookies['csrf_token']
    errors = {}
    user = User.query.get(id)

    if form.validate_on_submit():

        monthObj = {
            "January": 1,
			"February": 2,
			"March": 3,
			"April": 4,
			"May": 5,
			"June": 6,
			"July": 7,
			"August": 8,
			"September": 9,
			"October": 10,
			"November": 11,
			"December": 12,
        }
        dateOfBirth = f"{form.data['year']}-{monthObj[form.data['month']]}-{form.data['day']}"
        dob = datetime.strptime(dateOfBirth, '%Y-%m-%d')

        if username and len(username) < 40:
            user['username'] = username
        elif username:
            errors['username'] = 'Username must be less than 40 characters'

        if email:
            valid = re.search(r'[\w.]+\@[\w.]+', email)

        if email and len(email) < 255 and valid is True:
            user['email'] = email
        elif email:
            errors['email'] = 'Enter a valid email'

        if password:
            user['password'] = password

        if date_of_birth:
            user['date_of_birth'] = dob.date()

        if about and len(about) < 2000:
            user['about'] = about
        elif about:
            errors['about'] = 'About must less than 200 characters'

        if profile_pic:
            image = form.data["profile_pic"]
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if 'url' not in upload:
                errors['profile_pic'] = 'Invalid image url'
            else:
                user['profile_pic'] = upload['url']

    db.commit()
    return user.to_dict()
