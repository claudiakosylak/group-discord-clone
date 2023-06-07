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

@server_routes.route("/<int:id>/memberships")
@login_required
def get_memberships(id):
    memberships = Membership.query.filter(Membership.server_id == id).all()
    membership_dict = {}
    for membership in memberships:
        membership_dict[membership.id] = membership.to_dict()
    return membership_dict

@server_routes.route("/<int:id>/memberships", methods=["POST"])
@login_required
def create_membership(id):
    newMembership = Membership(
        role = "member",
        server_id = id,
        user_id = current_user.id
    )

    db.session.add(newMembership)
    db.session.commit()
    return newMembership.to_dict()

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

@server_routes.route("/discover")
@login_required
def discover_servers():
    all_servers = Server.query.filter(Server.private_status == False).all()
    # get list of all servers that exist that are public
    user_memberships = Membership.query.filter(Membership.user_id == current_user.id).all()
    # get list of all memberships that the user has
    owned_servers = Server.query.filter(Server.owner_id == current_user.id).all()
    #get list of all servers the user owns
    owned_server_ids = [server.id for server in owned_servers]
    # list of server ids for the servers user owns
    user_membership_ids = [membership.server_id for membership in user_memberships]
    # ohhhh
    user_discover_servers = []

    for server in all_servers:
        if server.id not in user_membership_ids and server.id not in owned_server_ids:
            user_discover_servers.append(server)

    # filtered_servers = [server for server in all_servers if server.id in user_discover_ids]
    servers_dict = {}
    for server in user_discover_servers:
        servers_dict[server.id] = server.to_dict()

    return servers_dict

@server_routes.route("/<int:id>")
@login_required
def get_server(id):
    current_server = Server.query.get(id)
    server_channels = Channel.query.filter(Channel.server_id == id)
    # current_server.to_dict()
    # current_server["channels"] = server_channels
    return current_server.to_dict()


@server_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_server(id):
    form = ServerForm()
    server = Server.query.get(id)
    if current_user.id == server.owner_id:
        server.title = form.data["title"]
        db.session.commit()
        return server.to_dict()
    return {"Only server owner can update information"}

@server_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_server(id):
    server = Server.query.get(id)
    db.session.delete(server)
    db.session.commit()
    return {"message": "successful"}



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



        db.session.add(newServer)
        db.session.commit()

        generalChannel = Channel(
            title="general",
            server_id= newServer.id
        )

        db.session.add(generalChannel)
        db.session.commit()


        return newServer.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
