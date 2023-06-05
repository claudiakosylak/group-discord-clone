import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import "./LoginForm.css";

function NewServerModal() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        

    }

    return(
        <>
            <h2>Create your server</h2>
            <p>Give your new server personality with a name and an icon.</p>
            <form>
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