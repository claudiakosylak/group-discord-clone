const GET_CURRENT_USERS_SERVERS = "server/GET_CURRENT_USERS_SERVERS"
const CREATE_NEW_SERVER = "server/CREATE_NEW_SERVER"

const getCurrentUsersServers = (servers) => ({
    type: GET_CURRENT_USERS_SERVERS,
    servers
})

const createNewServerAction = (server) => ({
    type: CREATE_NEW_SERVER,
    server
})

export const getServersThunk = () =>  async (dispatch) => {
    const res = await fetch("/api/servers")

    if (res.ok) {
        const data = await res.json()
        await dispatch(getCurrentUsersServers(data))
        return data
    } else {
        const errors = await res.json()
        return errors
    }
}

// TODO: create thunk for creating new server
// export const createNewServerThunk = (server) => async (dipatch) => {
//     const res = await fetch("/api/servers", {

//     })
// }
 
const initialState = { allServers: {}, currentServer: {} };

const serverReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_USERS_SERVERS:
            const newState = { ...state, allServers: {}, currentServer: {} }
            newState.allServers = action.servers
            console.log("action.servers: ", action.servers)
            return newState;
        default: 
            return state;
    }
}

export default serverReducer;