from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from ..forms.update_user_form import UpdateUserForm
from email_validator import validate_email
import re
from app.api.AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from datetime import datetime

user_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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
def update_user(id):
    """
    Update a user by their ID number
    """
    print('WE ARE HITTING THE UPDATE USER ROUTE')
    # print("WHAT IS THIS REQUEST======", kwargs)
    # id, username, email, password, month, day, year, about, profile_pic = request.body

    form = UpdateUserForm() #ToDo make the UpdateUserForm in forms folder
    form['csrf_token'].data = request.cookies['csrf_token']
    errors = {}
    user = User.query.get(id)
    # prof_pic = request.files['profile_pic']
    # prof_pic_test = request.get_json()
    # print('PROF PIC TEST --------------..>>>>>>>>', prof_pic_test)
    # print('PROF PIC ____+_+_+_+++_>>>>', prof_pic)
    # print('FORM FOR PROFILE PIC DOT DATA ----------->>>>>', form.profile_pic.data)
    print("THIS IS THE USER IN THE USER ROUTE=====================", user.to_dict())
    print("THIS IS THE FORM . DATA", form.data)
    print("ThIS IS THE VALIDATE FUNC =================", form.validate_on_submit)
    # print("THIS IS THE PROFILE_PIC IN THE PYTHON ROUTE -------------------->", form.data['profile_pic'])
    if form.validate_on_submit():
        print("THIS IS THE FORM.DATA=======================", form.data)
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
        print('HERE IS THE dateOfBirth ============================>', dateOfBirth)
        dob = datetime.strptime(dateOfBirth, '%Y-%m-%d')

        # if username and len(username) < 40:
        #     user['username'] = username
        # elif username:
        #     errors['username'] = 'Username must be less than 40 characters'

        # if email:
        #     valid = re.search(r'[\w.]+\@[\w.]+', email)

        # if email and len(email) < 255 and valid is True:
        #     user['email'] = email
        # elif email:
        #     errors['email'] = 'Enter a valid email'

        # if password:
        #     user['password'] = password

        # if dob:
        #     user['date_of_birth'] = dob.date()

        # if about and len(about) < 2000:
        #     user['about'] = about
        # elif about:
        #     errors['about'] = 'About must less than 200 characters'
        # print('PROFILE PIC DTATATAT ---------------', form.data['profile_pic'])
        # if form.data['profile_pic']:
        #     image = form.data["profile_pic"]
        #     image.filename = get_unique_filename(image.filename)
        #     upload = upload_file_to_s3(image)
        #     if 'url' not in upload:
        #         errors['profile_pic'] = 'Invalid image url'
        #     else:
        #         user.profile_pic = upload['url']
        user = User.query.get(id)
        print("========FORM . DATA USERNAME", form.data["username"])

        user.username = form.data['username']
        user.email = form.data["email"]
        # user["password"] = form.data["password"]
        user.date_of_birth = dob.date()
        user.about = form.data["about"]
        # user.profile_pic = form.data["profile_pic"]



        db.session.commit()
        print("the user to dict at the end of the commit=====", user.to_dict())
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@user_routes.route('/<int:id>/image', methods=['PUT'])
@login_required
def update_user_image(id):
    """Update a users profile image"""

    form = UpdateUserForm() #ToDo make the UpdateUserForm in forms folder
    form['csrf_token'].data = request.cookies['csrf_token']
    errors = {}
    user = User.query.get(id)
    # prof_pic = request.files['profile_pic']



    if form.data['profile_pic']:
            print("========THIS IS THE PICTURE IN THE IMAGE ROUTE", form.data)
            image = form.data["profile_pic"]
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print("+++++++ THIS IS THE PICTURES NEW FILE NAME", image.filename)
            if 'url' not in upload:
                errors['profile_pic'] = 'Invalid image url'
            else:
                user.profile_pic = upload['url']

    db.session.commit()
    return user.to_dict()
