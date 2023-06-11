from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField



class ServerForm(FlaskForm):
    title = StringField('SERVER NAME', validators=[DataRequired()])
    preview_icon = FileField("preview_icon")
