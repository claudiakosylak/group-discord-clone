import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { getServersThunk, updateServerThunk } from "../../store/server";
import DeleteServerModal from "../DeleteServerModal";
import "./EditServerModal.css"

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
        <>
            <div className="server-modal-inner-container">
                <div>
                    {(user.id == server.owner_id) && (
                        <OpenModalButton
                            buttonText="Delete Server"
                            modalComponent={<DeleteServerModal server={server}/>}
                        />
                    )}
                </div>
                <div>
                    <div className="top-edit-server-modal">
                    <h2>Server Overview</h2>
                    <p className="exit-x" onClick={closeModal}>x</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                    {errors.title ? <p style={{color:"darkred"}}>{errors.title}</p> : ""}
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
