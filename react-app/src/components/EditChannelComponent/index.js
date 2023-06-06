import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { getChannelsThunk, updateChannelThunk } from "../../store/channel";

function EditChannelModal({ channel }) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(channel.title)
    const [topic, setTopic] = useState(channel.topic)
    const [errors, setErrors] = useState("");
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const channelInfo = {
            title,
            topic
        }

        const response = await dispatch(updateChannelThunk(channelInfo, channel.id))
        if (response.errors) {
            setErrors(response.errors)
            return errors
        } else {
            await dispatch(getChannelsThunk(channel.server_id))
            closeModal()
        }
    }

    return (
        <>
            <h2>Overview</h2>
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
        </>
    )
}

export default EditChannelModal
