from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Server, Membership, db, Channel
from app.forms import ServerForm, ChannelForm

server_routes = Blueprint('servers', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@server_routes.route("/<int:id>/channels")
@login_required
def get_server_channels(id):
    server_channels = Channel.query.filter(Channel.server_id == id).all()
    channels_dict = {}
    for channel in server_channels:
        channels_dict[channel.id] = channel.to_dict()
    return channels_dict

@server_routes.route("/<int:id>/channels", methods=["POST"])
@login_required
def create_channel(id):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print("FORM DATA IN ROUTE: ", form.data)

    if form.validate_on_submit():
        newChannel = Channel(
            title=form.data["title"],
            server_id=id,
            topic=form.data["topic"]
        )
        print("NEW CHANNEL IN ROUTE: ", newChannel)

        db.session.add(newChannel)
        db.session.commit()
        return newChannel.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@server_routes.route("/<int:id>")
@login_required
def get_server(id):
    current_server = Server.query.filter(Server.server_id == id).first()
    return current_server.to_dict()

@server_routes.route('')
@login_required
def servers_route():
    """
    Query for all servers and returns them in a list of server dictionaries
    """

    all_servers = Server.query.all()
    user_memberships = Membership.query.filter(Membership.user_id == current_user.id).all()
    owned_servers = Server.query.filter(Server.owner_id == current_user.id).all()
    user_server_ids = []

    for membership in user_memberships:
        user_server_ids.append(membership.server_id)

    for servers in owned_servers:
        user_server_ids.append(servers.id)

    filtered_servers = [server for server in all_servers if server.id in user_server_ids]

    #normalize list (filtered_servers) to json format
    server_dict = {}

    for server in filtered_servers:
        server_dict[server.id] = server.to_dict()

    return server_dict


@server_routes.route('', methods=["POST"])
@login_required
def add_server():
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newServer = Server(
            title=form.data['title'],
            owner_id=current_user.id
        )

        print("NEW SERVER: ", newServer)

        db.session.add(newServer)
        db.session.commit()
        return newServer.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
