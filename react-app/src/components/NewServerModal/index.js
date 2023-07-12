import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewServerThunk, getServersThunk } from "../../store/server"
import { useHistory } from "react-router-dom";
import "./NewServerModal.css";

function NewServerModal() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [hasErrors, setHasErrors] = useState(false)
    const servers = useSelector(state => state.server.allServers)
    const serversList = Object.values(servers)

    const defaultImages = [
        "https://i.imgur.com/dHWrBJK.png",
        "https://i.imgur.com/vQrEpS1.png",
        "https://i.imgur.com/PI7kWup.png",
        "https://i.imgur.com/sidVfiL.png",
        "https://i.imgur.com/fDinbtN.png"
    ]


    const [previewIcon, setPreviewIcon] = useState(null);

    const { closeModal } = useModal();
    const history = useHistory()

    useEffect(() => {
        const errors = {}

        if (title.length > 40) errors.title = "Please enter a title that is less than 40 characters"
        if (imageUrl && (imageUrl.slice(imageUrl.length - 4 !== ".jpg" && imageUrl.length - 4 !== ".png" && imageUrl.length - 5 !== ".jpeg"))) errors.imageUrl = "Please enter an image url ending in '.jpg', '.png' or '.jpeg'"

        setErrors(errors)
    }, [title, hasErrors])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverInfo = {
            title,
            preview_icon: defaultImages[(Math.floor(Math.random() * defaultImages.length))]
        }


        if (Object.values(errors).length) {
            setHasErrors(true)
        } else {
            await dispatch(createNewServerThunk(serverInfo)).then(newServer => history.push(`/${newServer.id}/${newServer.channels[0].id}`))
            await dispatch(getServersThunk())
            // if (serversList.length > 0) {
                // history.push(`/${lastServer.id}/${lastServer.channels[0].id}`)
                setHasErrors(false)
                closeModal()

            // }
        }

    }

    return (
        <div className="create-server-wrapper">
            <p className="exit-x" onClick={closeModal}>x</p>
            <h2>Create your server</h2>
            <p className="create-server-subtext">Give your new server personality with a name and an icon.</p>
            <form onSubmit={handleSubmit} className="create-server-form">
                <div className="form-top-half">




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
