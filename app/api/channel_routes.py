from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel, db
from app.forms import ChannelForm

channel_routes = Blueprint("channels", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@channel_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_channel(id):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print("FORM DATA IN ROUTE: ", form.data)

    if form.validate_on_submit():
        channel = Channel.query.filter(Channel.id == id).first()
        channel.title = form.data["title"]
        channel.topic = form.data["topic"]

        db.session.commit()
        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
