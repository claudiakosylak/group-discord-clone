import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { getChannelsThunk, updateChannelThunk } from "../../store/channel";
import "./EditChannelComponent.css";
import OpenModalButton from "../OpenModalButton";
import DeleteChannelModal from "../DeleteChannelModal";

function EditChannelModal({ channel }) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(channel.title)
    const [topic, setTopic] = useState(channel.topic)
    const [errors, setErrors] = useState("");
    const [hasErrors, setHasErrors] = useState(false)
    const { closeModal } = useModal();

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
            const response = await dispatch(updateChannelThunk(channelInfo, channel.id))
            await dispatch(getChannelsThunk(channel.server_id))
            setHasErrors(false)
            closeModal()
        }

    }

    return (
        <>
        <div className="channel-modal-inner-container">
            <div>
                <OpenModalButton
                    buttonText="Delete Channel"
                    modalComponent={<DeleteChannelModal channel={channel}/>}

                />
            </div>
            <div>
            <h2>Overview</h2>
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
                    CHANNELTOPIC
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                    ></input>
                </label>
                <button type="submit">Save Changes</button>
            </form>

            </div>

        </div>
        </>
    )
}

export default EditChannelModal
