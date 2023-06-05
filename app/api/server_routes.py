from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Server, Membership


server_routes = Blueprint('servers', __name__)

@server_routes.route('/')
@login_required
def servers_route():
    """
    Query for all servers and returns them in a list of server dictionaries
    """

    all_servers = Server.query.all()
    print("SERVERS:", all_servers)

    for server in all_servers:
        print("server.id: ",server.id)
        
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
    print("all server ids for current user: ", user_server_ids)
    # for server in all_servers:
    #     if server.id in user_server_ids:
    #         server_dict[server.id]: dict(server)

    for server in filtered_servers:
        print("!!!!!!!!!!!!!!!! SERVER DICT: ",server.to_dict())
        server_dict[server.id] = server.to_dict()


    print("current User: ",current_user.id)
    print("user_memberships: ", user_memberships)

    # print("filtered servers: ", filtered_servers)

    print("FILTERED SERVERS: ", filtered_servers)
    print("************** DICT: ", server_dict)

    return filtered_servers