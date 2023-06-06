const GET_CURRENT_USERS_SERVERS = "server/GET_CURRENT_USERS_SERVERS"
const CREATE_NEW_SERVER = "server/CREATE_NEW_SERVER"
const DELETE_SERVER = "server/DELETE_SERVER"

const getCurrentUsersServers = (servers) => ({
    type: GET_CURRENT_USERS_SERVERS,
    servers
})

const createNewServerAction = (server) => ({
    type: CREATE_NEW_SERVER,
    server
})

const deleteServerAction = serverId => ({
    type: DELETE_SERVER,
    serverId
})

export const getServersThunk = () =>  async (dispatch) => {
    const res = await fetch("/api/servers")

    if (res.ok) {
        const data = await res.json()
        await dispatch(getCurrentUsersServers(data))
        return data
    } else {
        const err = await res.json()
        return err
    }
}

export const getOneServerThunk = serverId => async dispatch => {
    const res = await fetch(`/api/${serverId}`)

    if (res.ok) {
        const current_server = await res.json()
        await dispatch(createNewServerAction(current_server))
        return current_server
    } else {
        const err = await res.json()
        return err
    }
}

export const createNewServerThunk = (server) => async (dispatch) => {
    try {
        const res = await fetch("/api/servers", {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(server)
        })

        if (res.ok) {
            const newServer = await res.json()
            await dispatch(createNewServerAction(newServer))
            return newServer
        } else {
            const err = await res.json()
            return err
        }
    } catch(errors) {
        console.log("THIS IS THE CATCH ERROR: ", errors)

    }
}

export const updateServerThunk = (serverInfo, serverId) => async dispatch => {
    const res = await fetch(`/api/servers/${serverId}`, {
        method: "PUT",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(serverInfo)
    })
    console.log("WE ARE HITTING THE THUNK")
    if (res.ok) {
        const updatedServer = await res.json();
        await dispatch(createNewServerAction(updatedServer))
        return updatedServer
    } else {
        const err = await res.json()
        return err
    }
}

export const deleteServerThunk = (serverId) => async dispatch => {
    const res = await fetch(`/api/servers/${serverId}`, {method: "DELETE"})
    console.log("***** SERVERID IN THUNK", serverId)
    if (res.ok) {
        const successMessage = await res.json();
        console.log("SUCCESS MESSAGE: ", successMessage)
        dispatch(deleteServerAction(serverId))
        return successMessage;
    } else {
        const err = await res.json();
        console.log("THE ERROR IN THUNK: ", err)
        return err;
    }
}

const initialState = { allServers: {}, currentServer: {} };

const serverReducer = (state = initialState, action) => {
    console.log("ACTION TYPE", action.type)
    switch (action.type) {
        case GET_CURRENT_USERS_SERVERS:
            const newState = { ...state, allServers: {...state.allServers}, currentServer: {} }
            newState.allServers = action.servers
            console.log("action.servers: ", action.servers)
            return newState;
        case CREATE_NEW_SERVER:
            const createState = {...state, allServers: {...state.allServers}, currentServer: {} }
            createState.currentServer = action.server
            return createState
        case DELETE_SERVER:
            const deleteState = { ...state, allServers: {...state.allServers}, currentServer: {}}
            delete deleteState.allServers[action.serverId]
            return deleteState;
        default:
            return state;
    }
}

export default serverReducer;
