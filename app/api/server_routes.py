from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Server, Membership, db
from app.forms import ServerForm

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


@server_routes.route('/', methods=["POST"])
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
        return newServer.to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
