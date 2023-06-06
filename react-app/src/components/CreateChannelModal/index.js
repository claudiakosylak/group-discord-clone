import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createChannelThunk, getChannelsThunk } from "../../store/channel";

function NewChannelModal({serverId}) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("")
    const [errors, setErrors] = useState("");
    const { closeModal } = useModal();

    console.log("THE SERVER ID: ", serverId)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const channelInfo = {
            title,
            topic
        }

        const response = await dispatch(createChannelThunk(channelInfo, serverId))
        console.log("THE RESPONSE: ", response)
        if (response.errors) {
            setErrors(response.errors)
            return errors
        } else {
            await dispatch(getChannelsThunk(serverId))
            closeModal()
        }
    }

    return (
        <>
            <h2>Create Channel</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    CHANNEL NAME
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    ></input>
                </label>
                <label>
                    TOPIC
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                    ></input>
                </label>
                <button type="submit">Create Channel</button>
            </form>
        </>
    )
}

export default NewChannelModal
