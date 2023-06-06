import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import { getAllChannelMessagesThunk } from '../../store/channelMessages';

let socket;

function ChannelMessages({ channel }) {
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const user = useSelector(state => state.session.user);
    const channelMessages = useSelector(state => state.channelMessages.allChannelMessages);

    let messageList;
    
    console.log("CHANNEL:", channel)

    if (channelMessages) {
        messageList = Object.values(channelMessages);
    }

    console.log("CHANNEL MESSAGES: ", channelMessages)
    console.log("CHANNEL MESSAGELIST: ", messageList)

    useEffect(() => {
        setMessages(messageList);
    }, [channelMessages])


    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        // let msg = dispatch(getAllChannelMessagesThunk(channel));
        dispatch(getAllChannelMessagesThunk(channel));

        // let msgArray = Object.values(msg);

        // console.log("CHANNEL MESSAGES Selector in USEFFECT: ", messages)


        // listen for chat events
        socket.on("chat", (chat) => {
            // when we recieve a chat, add it into our messages array in state
            setMessages(messages => [...messages, chat])
        })
        
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        // emit a message
        socket.emit("chat", { user_id: user.id, content: chatInput });
        // clear the input field after the message is sent
        setChatInput("")
    }

    return (
        <div>
            <h1>hii from channel messages</h1>
            <div>
                {channelMessages && messageList.length > 0 && messages.map((message, ind) => (
                    <div key={ind}>{`${message.user_id}: ${message.content}`}</div>
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