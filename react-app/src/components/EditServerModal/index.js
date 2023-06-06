import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { getServersThunk, updateServerThunk } from "../../store/server";

function EditServerModal({ server }) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(server.title)
    const [errors, setErrors] = useState("");
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverInfo = {
            title
        }

        const response = await dispatch(updateServerThunk(serverInfo, server.id))
        if (response.errors) {
            setErrors(response.errors)
            return errors
        } else {
            await dispatch(getServersThunk())
            closeModal()
        }
    }

    return (
        <>
        <div className="server-modal-inner-container">
            <div>

            </div>
            <div>
            <h2>Server Overview</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    SERVER NAME
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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

export default EditServerModal