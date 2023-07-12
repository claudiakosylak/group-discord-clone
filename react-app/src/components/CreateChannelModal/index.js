import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createChannelThunk, getChannelsThunk } from "../../store/channel";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./CreateChannelModal.css";

function NewChannelModal({ serverId }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("")
    const [errors, setErrors] = useState("");
    const [hasErrors, setHasErrors] = useState(false)
    const { closeModal } = useModal();

    const history = useHistory();

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
            history.push(`/${serverId}/${response.id}`)
            closeModal()

        }

    }

    return (
        <div className="create-channel-modal-wrapper">
            <h2 className="create-channel-header">Create Channel</h2>
            <form onSubmit={handleSubmit} className="create-channel-form">
                <div className="channel-form-top-half">
                    <label className="channel-name-label">
                        CHANNEL NAME
                        <div className="channel-name-input-chunk">
                            <i class="fa-regular fa-hashtag" id="create-channel-hashtag"></i>
                            <input
                                className="channel-name-input-box"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="new-channel"
                                required
                                ></input>
                        </div>
                    </label>
                                {errors.title ? <p className="create-server-errors">{errors.title}</p> : ""}
                    <label className="channel-name-label">
                        TOPIC
                        <input
                            className="channel-name-input-box topic-input"
                            placeholder="enter a topic for your channel"
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                            ></input>
                    </label>
                            {errors.topic ? <p className="create-server-errors">{errors.topic}</p> : ""}

                </div>
                <div className="channel-form-bottom">
                    <p onClick={closeModal}>Cancel</p>
                    <button disabled={title.length > 40 || topic.length > 255} type="submit">Create Channel</button>
                </div>
            </form>
        </div>
    )
}

export default NewChannelModal
