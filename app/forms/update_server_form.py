from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired



class UpdateServerForm(FlaskForm):
    title = StringField('SERVER NAME', validators=[DataRequired()])
    preview_icon = FileField("preview_icon")
