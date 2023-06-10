import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { getServersThunk, updateServerThunk } from "../../store/server";
import DeleteServerModal from "../DeleteServerModal";
import "./EditServerModal.css"
import OpenDeleteChannelButton from "../OpenDeleteChannelButton";

function EditServerModal({ server }) {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [title, setTitle] = useState(server.title)
    const [errors, setErrors] = useState("");
    const [hasErrors, setHasErrors] = useState(false)
    const { closeModal } = useModal();

    useEffect(() => {
        const errors = {}

        if (title.length > 40) errors.title = "Please enter a title that is less than 40 characters"

        setErrors(errors)
    }, [title, hasErrors])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverInfo = {
            title
        }

        if (Object.values(errors).length) {
            setHasErrors(true)
        } else {
            const response = await dispatch(updateServerThunk(serverInfo, server.id))
            await dispatch(getServersThunk())
            closeModal()

        }

    }

    useEffect(() => {
        if (!server) {
            closeModal()
        }
    }, [dispatch, server])

    return (
        <div className="server-modal-inner-container">
            <div className="edit-server-left">
                {(user.id == server.owner_id) && (
                    <OpenDeleteChannelButton
                        buttonText="Delete Server"
                        modalComponent={<DeleteServerModal server={server} />}
                    />
                )}
            </div>
            <div className="edit-server-right">
                <div className="top-edit-server-modal">
                    <h2>Server Overview</h2>
                    <p className="exit-x" onClick={closeModal}>x</p>
                </div>
                <form onSubmit={handleSubmit} className="edit-server-form">
                    <div className="edit-server-form-top">
                        <i class="fa-solid fa-camera"></i>
                        <label className="edit-server-labels">
                            SERVER NAME
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                ></input>
                        </label>
                                {errors.title ? <p className="create-server-errors">{errors.title}</p> : ""}
                    </div>
                    <div className="edit-server-form-bottom">

                        <button className="edit-server-submit" disabled={title.length > 40} type="submit">Save Changes</button>
                    </div>
                </form>

            </div>

        </div>

    )
}

export default EditServerModal
