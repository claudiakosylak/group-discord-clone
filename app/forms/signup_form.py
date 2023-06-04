from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import datetime


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

# adding this below
months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
days = [num_day for num_day in range(1, 32)]

current_year = datetime.date.today()
year_only = current_year.year
years = [num_year for num_year in range(1900, year_only)]
# adding the above

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    month = SelectField("Month", choices=months, default="Month", validators=[DataRequired()])
    day = SelectField("Day", choices=days, default="Day", validators=[DataRequired()])
    year = SelectField("Year", choices=years, default="Year", validators=[DataRequired()])
