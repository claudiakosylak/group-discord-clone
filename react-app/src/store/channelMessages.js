const GET_ALL_CHANNEL_MESSAGES = "channelMessages/GET_ALL_CHANNEL_MESSAGES"

const getAllChannelMessagesAction = (channelMessages) => ({
    type: GET_ALL_CHANNEL_MESSAGES,
    channelMessages
})

export const getAllChannelMessagesThunk = (channelId) => async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}/messages`)

    console.log("!!!!!!!! RESPONSE IN THUNK: ", res)

    if (res.ok) {
        const channelMessages = await res.json();
        dispatch(getAllChannelMessagesAction(channelMessages));
        console.log("thunk get all channel messages:", dispatch(getAllChannelMessagesAction(channelMessages)))
        return channelMessages;
    } else {
        const err = await res.json();
        return err;
    }
}

const initalState = { allChannelMessages: {} };

const channelMessagesReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_ALL_CHANNEL_MESSAGES:
            const newState = {...state, allChannelMessages: {...state.allChannelMessages}}
            newState.allChannelMessages = action.channelMessages
            return newState

        default:
            return state;
    }
}

export default channelMessagesReducer;