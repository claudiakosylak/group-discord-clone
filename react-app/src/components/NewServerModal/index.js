import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewServerThunk, getServersThunk } from "../../store/server"
import { useHistory } from "react-router-dom";
import "./NewServerModal.css";

function NewServerModal() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState("");
    const [hasErrors, setHasErrors] = useState(false)

    const [previewIcon, setPreviewIcon] = useState(null);

    const { closeModal } = useModal();
    const history = useHistory()

    useEffect(() => {
        const errors = {}

        if (title.length > 40) errors.title = "Please enter a title that is less than 40 characters"

        setErrors(errors)
    }, [title, hasErrors])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverInfo = {
            title,
            previewIcon,
        }


        if (Object.values(errors).length) {
            setHasErrors(true)
        } else {
            const response = await dispatch(createNewServerThunk(serverInfo))
            console.log("THIS IS THE RESPONSE AFTER THE DISPATCH CREATE NEW SERVER", response)
            await dispatch(getServersThunk())
            history.push(`/${response.id}/${response.channels[0].id}`)
            setHasErrors(false)
            closeModal()
        }

    }



    return (
        <div className="create-server-wrapper">
            <p className="exit-x" onClick={closeModal}>x</p>
            <h2>Create your server</h2>
            <p className="create-server-subtext">Give your new server personality with a name and an icon.</p>
            <form onSubmit={handleSubmit} className="create-server-form">
                <div className="form-top-half">
                    <label>
                    <div>
                    <i class="fa-solid fa-camera"></i>
                    </div>

                    <label>
                        Profile Picture
                        <input
                            className="server-image-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPreviewIcon(e.target.files[0])}
                        />
                    </label>
                    </label>

                    <label className="server-name-label">
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
                <div className="server-bottom-form">
                    <button disabled={title.length > 40} type="submit">Create</button>

                </div>
            </form>
        </div>
    )
}

export default NewServerModal;
