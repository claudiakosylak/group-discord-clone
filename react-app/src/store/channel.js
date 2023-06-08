const GET_SERVER_CHANNELS = "channel/GET_SERVER_CHANNELS"
const GET_CHANNEL = "channel/GET_CHANNEL"
const DELETE_CHANNEL = "channel/DELETE_CHANNEL"


const getChannelsAction = (channels) => ({
    type: GET_SERVER_CHANNELS,
    channels
})

const getOneChannelAction = channel => ({
    type: GET_CHANNEL,
    channel
})

const deleteChannelAction = channelId => ({
    type: DELETE_CHANNEL,
    channelId
})

export const getOneChannelThunk = channelId => async dispatch => {
    const res = await fetch(`/api/channels/${channelId}`)
    if (res.ok) {
        const channel = await res.json()
        dispatch(getOneChannelAction(channel))
        return channel
    } else {
        const err = await res.json();
        return err;
    }
}

export const deleteChannelThunk = channelId => async dispatch => {
    const res = await fetch(`/api/channels/${channelId}`, {method: "DELETE"})
    if (res.ok) {
        const successMessage = await res.json();
        dispatch(deleteChannelAction(channelId))
        return successMessage;
    } else {
        const err = await res.json();
        return err;
    }
}

export const getChannelsThunk = serverId => async dispatch => {
    const res = await fetch(`/api/servers/${serverId}/channels`)
    // console.log('RES IN GET CHANNELS THUNK !!!!!!!!!!!!', res)
    if (res.ok) {
        const channels = await res.json()
        await dispatch(getChannelsAction(channels))
        return channels
    } else {
        const err = await res.json()
        return err
    }
}

export const createChannelThunk = (channel, serverId) => async dispatch => {
    try {

        const res = await fetch(`/api/servers/${serverId}/channels`, {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(channel)
        })

        if (res.ok) {
            const newChannel = await res.json()
            await dispatch(getOneChannelAction(newChannel))
            return newChannel
        } else {
            const err = await res.json()
            return err
        }
    } catch(errors) {
        console.log("THIS IS CATCH ERROR: ", errors)
    }
}

export const updateChannelThunk = (channelInfo, channelId) => async dispatch => {
    const res = await fetch(`/api/channels/${channelId}`, {
        method: "PUT",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(channelInfo)
    })

    if (res.ok) {
        const updatedChannel = await res.json();
        await dispatch(getOneChannelAction(updatedChannel))
        return updatedChannel
    } else {
        const err = await res.json()
        return err
    }
}


const initialState = { allChannels: {}, currentChannel: {}}

const channelReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SERVER_CHANNELS:
            const channelState = {...state, allChannels: {}, currentChannel: {}}
            channelState.allChannels = action.channels
            return channelState;
        case GET_CHANNEL:
            const newState = { ...state, allChannels: {...state.allChannels}, currentChannel: {}}
            newState.currentChannel = action.channel
            return newState
        case DELETE_CHANNEL:
            const deleteState = { ...state, allChannels: {...state.allChannels}, currentChannel: {}}
            delete deleteState.allChannels[action.channelId]
            return deleteState;
        default:
            return state;
    }
}

export default channelReducer;
