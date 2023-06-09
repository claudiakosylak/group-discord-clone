import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createChannelThunk, getChannelsThunk } from "../../store/channel";

function NewChannelModal({serverId}) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("")
    const [errors, setErrors] = useState("");
    const [hasErrors, setHasErrors] = useState(false)
    const { closeModal } = useModal();

    console.log("THE SERVER ID: ", serverId)

    useEffect(() => {
        const errors = {}

        if (title.length > 40) errors.title = "Please enter a channel name that is less than 40 characters"
        if (topic.length > 255) errors.topic = "Please enter a topic that is less than 255 characters"

        setErrors(errors)
    }, [title, topic, hasErrors])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const channelInfo = {
            title,
            topic
        }

        if (Object.values(errors).length) {
            setHasErrors(true)
        } else {
            const response = await dispatch(createChannelThunk(channelInfo, serverId))
            await dispatch(getChannelsThunk(serverId))
            setHasErrors(false)
            closeModal()

        }

    }

    return (
        <>
            <h2>Create Channel</h2>
            <form onSubmit={handleSubmit}>
            {errors.title ? <p style={{color:"darkred"}}>{errors.title}</p> : ""}
            {errors.topic ? <p style={{color:"darkred"}}>{errors.topic}</p> : ""}
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
                <button disabled={title.length > 40 || topic.length > 255} type="submit">Create Channel</button>
            </form>
        </>
    )
}

export default NewChannelModal
