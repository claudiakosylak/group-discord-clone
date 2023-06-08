import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewServerThunk, getServersThunk } from "../../store/server"
import { useHistory } from "react-router-dom";
// import "./LoginForm.css";

function NewServerModal() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState("");
    const { closeModal } = useModal();
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverInfo = {
            title
        }

        const response = await dispatch(createNewServerThunk(serverInfo))

        if (response.errors) {
            setErrors(response.errors)
            return errors
        } else {
            await dispatch(getServersThunk())
            history.push(`/${response.id}/${response.channels[0].id}`)
            closeModal()
        }
    }

    return(
        <>
            <h2>Create your server</h2>
            <p>Give your new server personality with a name and an icon.</p>
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
                <button type="submit">Create</button>
            </form>
        </>
    )
}

export default NewServerModal;
