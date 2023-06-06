const GET_SERVER_CHANNELS = "channel/GET_SERVER_CHANNELS"

const getChannelsAction = (channels) => ({
    type: GET_SERVER_CHANNELS,
    channels
})

export const getChannelsThunk = serverId => async dispatch => {
    const res = await fetch(`/api/${serverId}/channels`)

    if (res.ok) {
        const channels = await res.json()
        await dispatch(getChannelsAction(channels))
        return channels
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
        default:
            return state;
    }
}

export default channelReducer;
