import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { getChannelsThunk, updateChannelThunk } from "../../store/channel";
import "./EditChannelComponent.css";
import OpenDeleteChannelButton from "../OpenDeleteChannelButton";
import DeleteChannelModal from "../DeleteChannelModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function EditChannelModal({ channel }) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(channel.title)
    const [topic, setTopic] = useState(channel.topic)
    const [errors, setErrors] = useState("");
    const [hasErrors, setHasErrors] = useState(false)
    const { closeModal } = useModal();
    const history = useHistory()

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
            history.push(`/${channel.server_id}/${channel.id}`)
            closeModal()
        }

    }

    return (
        <>
            <div className="channel-modal-inner-container">
                <div className="edit-channel-left">
                    <OpenDeleteChannelButton
                        buttonText="Delete Channel"
                        modalComponent={<DeleteChannelModal channel={channel} />}

                    />
                </div>
                <div className="edit-channel-right">
                    <h2>Overview</h2>
                    <p className="exit-x" onClick={closeModal}>x</p>
                    <form className="edit-channel-form" onSubmit={handleSubmit}>
                        <div className="edit-channel-top">

                        <label className="edit-channel-labels">
                            CHANNEL NAME
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                ></input>
                        </label>
                                {errors.title ? <p className="edit-channel-errors" >{errors.title}</p> : ""}

                        <label className="edit-channel-labels">
                            CHANNEL TOPIC
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                required
                                ></input>
                        </label>
                                {errors.topic ? <p className="edit-channel-errors">{errors.topic}</p> : ""}
                                </div>
                        <button className="edit-channel-submit" disabled={title.length > 40 || topic.length > 255} type="submit">Save Changes</button>
                    </form>

                </div>

            </div>
        </>
    )
}

export default EditChannelModal
