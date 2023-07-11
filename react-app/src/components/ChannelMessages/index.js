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
    const currentChannel = useSelector(state => state.channel.currentChannel)
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
        // dispatch(getChannelsThunk(server));
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
                <div id="channel-message-scroll">
                    <p>Welcome to #{currentChannel.title}!</p>
                    <div id='channel-messages'>
                        {server && channel && messageList.length > 0 && messageList.map((message, ind) => (
                            <div className="channel-messages-message-div" key={ind}>
                                    <img src={message.user.profile_pic} className="message-user-pic" />
                                    <div className="message-content">
                                        <div className="message-header">
                                          <span className="message-username">{message.user.username}</span>
                                          <span className="message-time">{message.created_at.split(" ")[4]}</span>
                                        </div>
                                        <p>{message.content} { message.user.id === user.id ? <span onClick={(() => deleteChat(message.id))}>
                                            <i class="fa-regular fa-trash-can"></i></span> : ''}</p>
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
                <form id='chat-input-form' onSubmit={sendChat}>
                    <div>
                        <input id='chat-input'
                                value={chatInput}
                                onChange={updateChatInput}
                                placeholder={`Message #${currentChannel.title}`}
                        />
                        <button id='chat-send-button' disabled={chatInput.length === 0 || chatInput.length > 1000} type="submit" maxlength="1000">Send</button>
                    </div>
                    <div id="message-warning">{chatInput.length > 1000 ? <p>Please keep your message below 1000 characters</p> : ''}</div>
                </form>
            </div>
    )

}

export default ChannelMessages;
