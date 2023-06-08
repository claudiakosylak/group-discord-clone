from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel, ChannelMessage, db
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

@channel_routes.route("/<int:channel_id>/messages/<int:channel_message_id>", methods=["DELETE"])
@login_required
def delete_channel_messages(channel_id, channel_message_id):
    message = ChannelMessage.query.filter(ChannelMessage.id == channel_message_id).first()
    db.session.delete(message)
    db.session.commit()

    return message

@channel_routes.route("/<int:id>")
@login_required
def get_one_channel(id):
    current_channel = Channel.query.get(id)
    return current_channel.to_dict()

@channel_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_channel(id):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        channel = Channel.query.filter(Channel.id == id).first()
        channel.title = form.data["title"]
        channel.topic = form.data["topic"]

        db.session.commit()
        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@channel_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_channel(id):
    channel = Channel.query.get(id)
    db.session.delete(channel)
    db.session.commit()
    return {"message": "successful"}


@channel_routes.route("/<int:id>/messages", methods=["GET"])
@login_required
def channel_messages(id):
    messages = ChannelMessage.query.filter(ChannelMessage.channel_id == id).all()

    message_dict = []

    for message in messages:
        message_dict.append(message.to_dict())

    return message_dict
