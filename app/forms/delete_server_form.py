from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class DeleteServerForm(FlaskForm):
    title = StringField("ENTER SERVER NAME", validators=[DataRequired()])
