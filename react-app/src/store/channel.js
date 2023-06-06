const GET_SERVER_CHANNELS = "channel/GET_SERVER_CHANNELS"
const GET_CHANNEL = "channel/GET_CHANNEL"

const getChannelsAction = (channels) => ({
    type: GET_SERVER_CHANNELS,
    channels
})

const getOneChannelAction = channel => ({
    type: GET_CHANNEL,
    channel
})

export const getChannelsThunk = serverId => async dispatch => {
    const res = await fetch(`/api/servers/${serverId}/channels`)

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
        default:
            return state;
    }
}

export default channelReducer;
