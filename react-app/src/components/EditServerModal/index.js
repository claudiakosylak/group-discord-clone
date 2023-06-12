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
    const [previewIcon, setPreviewIcon] = useState(null);
    const { closeModal } = useModal();

    useEffect(() => {
        const errors = {}

        if (title.length > 40) errors.title = "Please enter a title that is less than 40 characters"
        if (previewIcon && (previewIcon.slice(previewIcon.length - 4) !== ".jpg" && previewIcon.slice(previewIcon.length - 4) !== ".png" && previewIcon.slice(previewIcon.length - 5) !== ".jpeg")) errors.previewIcon = "Please enter an image url ending in '.jpg', '.png' or '.jpeg'"

        setErrors(errors)
    }, [title, previewIcon, hasErrors])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverInfo = {
            title,
            previewIcon
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
                        {/* <label className="server-image-label">

                            <div>
                            <i class="fa-solid fa-camera"></i>
                            </div>
                            <input
                                className="server-image-upload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPreviewIcon(e.target.files[0])}
                            />

                        </label> */}

                        <label className="server-name-label">
                            ENTER IMAGE URL
                            <input

                                type="text"
                                // accept="image/*"
                                value={previewIcon}
                                onChange={(e) => setPreviewIcon(e.target.value)}
                            />

                        </label>
                        {errors.previewIcon ? <p className="create-server-errors">{errors.previewIcon}</p> : ""}


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
