from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired




class ChannelForm(FlaskForm):
    title = StringField('CHANNEL NAME', validators=[DataRequired()])
    topic = StringField('TOPIC', validators=[DataRequired()])
