import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewServerThunk, getServersThunk } from "../../store/server"
import { useHistory } from "react-router-dom";
// import "./LoginForm.css";

function NewServerModal() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState("");
    const [hasErrors, setHasErrors] = useState(false)
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
            title
        }


        if (Object.values(errors).length) {
            setHasErrors(true)
        } else {
                const response = await dispatch(createNewServerThunk(serverInfo))
                await dispatch(getServersThunk())
                history.push(`/${response.id}/${response.channels[0].id}`)
                setHasErrors(false)
                closeModal()
            }

        }



    return(
        <>
            <h2>Create your server</h2>
            <p>Give your new server personality with a name and an icon.</p>
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
                <button disabled={title.length > 40} type="submit">Create</button>
            </form>
        </>
    )
}

export default NewServerModal;
