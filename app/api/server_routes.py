from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Server, Membership, db, Channel
from app.forms import ServerForm, ChannelForm
from app.api.AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

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

@server_routes.route('/<int:id>/image', methods=['POST'])
@login_required
def add_image_to_create_server(id):
    """
    Add a server image when creating a new server
    """

    print('🔥🔥🔥HITTING THE SERVER IMAGE ROUTE')

    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    errors = {}
    server = Server.query.get(id)

    if form.data['preview_icon']:
        image = form.data["preview_icon"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
            # print("+++++++ THIS IS THE PICTURES NEW FILE NAME", image.filename)
        if 'url' not in upload:
            errors['preview_icon'] = 'Invalid image url'
        else:
            server.preview_icon = upload['url']

    db.session.commit()
    print("🔥🔥🔥 THIS IS THE CREATE SERVER WITH IMAGE", server.to_dict())
    return server.to_dict()

@server_routes.route("/<int:id>/image", methods=["PUT"])
@login_required
def update_image_to_server(id):
    """
    Update a server image
    """
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    errors = {}
    server = Server.query.get(id)

    if form.data["preview_icon"]:
        image = form.data["preview_icon"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if 'url' not in upload:
            errors['preview_icon'] = 'Invalid image url'
        else:
            server.preview_icon = upload['url']
    db.session.commit()
    return server.to_dict()

@server_routes.route("/<int:id>/memberships")
@login_required
def get_memberships(id):

    """Returns the memberships of a server"""

    memberships = Membership.query.filter(Membership.server_id == id).all()
    membership_dict = {}
    for membership in memberships:
        membership_dict[membership.id] = membership.to_dict()
    return membership_dict

@server_routes.route("/<int:id>/memberships", methods=["POST"])
@login_required
def create_membership(id):

    """Creates a server membership"""

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

    """Gets all the channels of a server"""

    server_channels = Channel.query.filter(Channel.server_id == id).all()
    print('Server Channels in the backend route', server_channels)
    channels_dict = {}
    for channel in server_channels:
        channels_dict[channel.id] = channel.to_dict()
    return channels_dict

@server_routes.route("/<int:id>/channels", methods=["POST"])
@login_required
def create_channel(id):

    """Creates a new channel"""

    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newChannel = Channel(
            title=form.data["title"],
            server_id=id,
            topic=form.data["topic"]
        )

        db.session.add(newChannel)
        db.session.commit()
        return newChannel.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@server_routes.route("/discover")
@login_required
def discover_servers():

    """Returns all the public servers that a user is not in"""

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
        server_dict = server.to_dict()
        print('🍕 SERVER DICT', server_dict)
        channels = Channel.query.filter(Channel.server_id == server_dict["id"]).all()
        print('🍕 channels', channels)
        server_dict["channels"] = [channel.to_dict() for channel in channels]
        print('🍕 SERVER DICT WITH CHANNELS', server_dict)
        servers_dict[server.id] = server_dict

    print('🍕 SERVERs_DICT', servers_dict)
    return servers_dict

@server_routes.route("/<int:id>")
@login_required
def get_server(id):

    """Returns a single server"""

    current_server = Server.query.get(id)
    server_channels = Channel.query.filter(Channel.server_id == id)
    dict_server = current_server.to_dict()
    dict_server["channels"] = [channel.to_dict() for channel in server_channels]
    # current_server.to_dict()
    # current_server["channels"] = server_channels
    return dict_server


@server_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_server(id):

    """Updates a server"""

    form = ServerForm()
    server = Server.query.get(id)
    if current_user.id == server.owner_id:
        server.title = form.data["title"]
        if form.data["preview_icon"]:
            image = form.data["preview_icon"]
            server.preview_icon = form.data["preview_icon"]
        db.session.commit()
        return server.to_dict()
    return {"Only server owner can update information"}

@server_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_server(id):

    """Deletes a server"""

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
        dict_server = server.to_dict()
        print("🍎DICT SERVER: ", dict_server)
        channels = Channel.query.filter(Channel.server_id == dict_server["id"]).all()
        print("🍎CHANNELS: ", channels)
        dict_server["channels"] = [channel.to_dict() for channel in channels]
        print("🍎DICT SERVER WITH CHANNELS?", dict_server)
        server_dict[server.id] = dict_server

    print("✌🏻SERVER DICTIONARY : ", server_dict)
    return server_dict


@server_routes.route('', methods=["POST"])
@login_required
def add_server():

    """Creates a new server"""

    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        newServer = Server(
            title=form.data['title'],
            owner_id=current_user.id,
            preview_icon=form.data['preview_icon']
        )



        db.session.add(newServer)
        db.session.commit()

        generalChannel = Channel(
            title="general",
            server_id= newServer.id
        )

        db.session.add(generalChannel)
        db.session.commit()

        dict_new_server = newServer.to_dict()

        dict_new_server["channels"] = [generalChannel.to_dict()]


        return dict_new_server

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
