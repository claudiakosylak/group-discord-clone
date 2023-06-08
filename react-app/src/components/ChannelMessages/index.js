import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import { getAllChannelMessagesThunk } from '../../store/channelMessages';
import { getChannelsThunk } from '../../store/channel';
import { deleteOneChannelMessageThunk } from '../../store/channelMessages';
import "./ChannelMessages.css"

let socket;

function ChannelMessages({ channel, server }) {
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const user = useSelector(state => state.session.user);
    const channelMessages = useSelector(state => state.channelMessages.allChannelMessages);

    let messageList;

    if (channelMessages) {
        messageList = Object.values(channelMessages);
    }


    console.log("MESSAGELIST: ", messageList)

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

        // listen for delete events
        socket.on("delete_message", (delete_message) => {
            // when we recieve a chat, add it into our messages array in state
            setMessages(messages => messages.filter(message => message.id !== delete_message.id))
            console.log("DELETE message from component", delete_message)
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

    //   useEffect(() => {
    //     dispatch(getAllChannelMessagesThunk(channel));
    //     setDeleteting(false)
    // }, [deleting])


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

    const deleteChat = (messageId) => {
        // emit a message
        socket.emit("delete_message", { id : messageId  });

        // clear the input field after the message is sent
        setChatInput("")
    }

    return (
        <div className="channel-messages-container">
            <h1>hii from channel messages</h1>
            <div>
                {server && channel && messageList.length > 0 && messageList.map((message, ind) => (
                    <div key={ind}>{`${message.user.username}: ${message.content}`} <span onClick={(() => deleteChat(message.id))}>X</span></div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button disabled={chatInput.length === 0} type="submit">Send</button>
            </form>
        </div>
    )

}

export default ChannelMessages;
