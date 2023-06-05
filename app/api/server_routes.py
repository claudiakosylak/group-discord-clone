from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Server, Membership


server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
@login_required
def servers():
    """
    Query for all servers and returns them in a list of server dictionaries
    """

    servers = Server.query.all()
    print("SERVERS:", servers)

    for server in servers:
        print("server.id: ",server.id)
        
    user_memberships = Membership.query.filter(Membership.user_id == current_user.id)
    owned_servers = Server.query.filter(Server.owner_id == current_user.id)
    user_server_ids = []

    for membership in user_memberships:
        user_server_ids.append(membership.server_id)

    for servers in owned_servers:
        user_server_ids.append(servers.id)



    # filtered_servers = [server for server in servers if server.id in user_server_ids]

    #normalize list (filtered_servers) to json format
    server_dict = {}
    print("all server ids for current user: ", user_server_ids)
    for server in servers:
        if server.id in user_server_ids:
            server_dict[server.id]: dict(server)

    # for server in filtered_servers:
    #     server_dict[server.id]: server


    print("current User: ",current_user.id)
    print("user_memberships: ", user_memberships)

    # print("filtered servers: ", filtered_servers)

    return server_dict