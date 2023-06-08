const GET_ALL_CHANNEL_MESSAGES = "channelMessages/GET_ALL_CHANNEL_MESSAGES"
const DELETE_ONE_CHANNEL_MESSAGE = "channelMessages/DELETE_ONE_CHANNEL_MESSAGE"

const getAllChannelMessagesAction = (channelMessages) => ({
    type: GET_ALL_CHANNEL_MESSAGES,
    channelMessages
})

const deleteOneChannelMessageAction = (channelMessage) => ({
        type: DELETE_ONE_CHANNEL_MESSAGE,
        channelMessage
})

export const getAllChannelMessagesThunk = (channelId) => async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}/messages`)

    if (res.ok) {
        const channelMessages = await res.json();
        dispatch(getAllChannelMessagesAction(channelMessages));
        return channelMessages;
    } else {
        const err = await res.json();
        return err;
    }
}

export const deleteOneChannelMessageThunk = (channelId, channelMessageId) => async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}/messages/${channelMessageId}`, {method: "DELETE"})

    if (res.ok) {
        const successMessage = await res.json();
        dispatch(deleteOneChannelMessageAction(channelMessageId))
        return successMessage;
    } else {
        const err = await res.json();
        return err;
    }
}

const initalState = { allChannelMessages: {} };

const channelMessagesReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_ALL_CHANNEL_MESSAGES:
            const newState = {...state, allChannelMessages: {}}
            newState.allChannelMessages = action.channelMessages
            return newState
        case DELETE_ONE_CHANNEL_MESSAGE:
            const deleteChannelMessageState = { ...state, allChannelMessages: {...state.allChannelMessages}}
            delete deleteChannelMessageState.allChannelMessages[action.channelMessage]
            return deleteChannelMessageState;
        default:
            return state;
    }
}

export default channelMessagesReducer;
