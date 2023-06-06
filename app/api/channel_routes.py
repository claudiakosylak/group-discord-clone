from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel, db

channel_routes = Blueprint("channels", __name__)

# @channel_routes.route("/<int:id>")
# @login_required
# def channels_route():
#     server_channels = Channel.query.filter(Channel.server_id )
