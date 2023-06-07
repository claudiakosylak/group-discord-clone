import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import { getAllChannelMessagesThunk } from '../../store/channelMessages';
import { getChannelsThunk } from '../../store/channel';
import { deleteOneChannelMessageThunk } from '../../store/channelMessages';

let socket;

function ChannelMessages({ channel, server }) {
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const user = useSelector(state => state.session.user);
    const channelMessages = useSelector(state => state.channelMessages.allChannelMessages);
    const [deleting, setDeleteting] = useState(false);

    let messageList;

    if (channelMessages) {
        messageList = Object.values(channelMessages);
    }

    const deleteMessage = (channel, messageId) => {
        dispatch(deleteOneChannelMessageThunk(channel, messageId))
        setDeleteting(true)
    }

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        // let msg = dispatch(getAllChannelMessagesThunk(channel));
        dispatch(getAllChannelMessagesThunk(channel));

        // listen for chat events
        socket.on("chat", (chat) => {
            // when we recieve a chat, add it into our messages array in state
            setMessages(messages => [...messages, chat])
            console.log("CHAT",chat)
            // dispatch(getAllChannelMessagesThunk(channel));
        })

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    useEffect(() => {
        dispatch(getAllChannelMessagesThunk(channel));
        setMessages(messageList);
    }, [channel])

    useEffect(() => {
        dispatch(getAllChannelMessagesThunk(channel));
    }, [messages])

    useEffect(() => {
        dispatch(getChannelsThunk(server));
        dispatch(getAllChannelMessagesThunk(channel));
      }, [server])

      useEffect(() => {
        dispatch(getAllChannelMessagesThunk(channel));
        setDeleteting(false)
    }, [deleting])


    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()

        // emit a message
        socket.emit("chat", { channel_id: channel, user_id: user.id, content: chatInput });

        // clear the input field after the message is sent
        setChatInput("")
    }

    return (
        <div>
            <h1>hii from channel messages</h1>
            <div>
                {server && channel && messageList.length > 0 && messageList.map((message, ind) => (
                    <div key={ind}>{`${message.user_id}: ${message.content}`} <span onClick={(() => deleteMessage(channel, message.id))}>X</span></div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )

}

export default ChannelMessages;
