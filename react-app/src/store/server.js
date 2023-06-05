const GET_CURRENT_USERS_SERVERS = "servers/GET_CURRENT_USERS_SERVERS"

const getCurrentUsersServers = () => ({
    type: GET_CURRENT_USERS_SERVERS,
    servers
})

const initialState = { servers: {}, currentServer: {} };

const serverReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_USERS_SERVERS:
            return {  };
    }
}

