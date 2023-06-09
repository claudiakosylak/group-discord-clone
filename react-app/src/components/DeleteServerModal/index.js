import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteServerThunk, getServersThunk } from "../../store/server";
import { useState, useEffect } from "react";

function DeleteServerModal({ server }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const [enteredTitle, setEnteredTitle] = useState("");
    const [errors, setErrors] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false)

    console.log("SERVER IN MODAL", server)
    console.log("SERVERID IN MODAL", server.id)
    const history = useHistory();

    // useEffect(() => {
    //     const errors = {}

    //     // if (enteredTitle !== server.title || enteredTitle !== "") errors.title = "You didn't enter the server name correctly"
    //     if (enteredTitle !== server.title) errors.title = "You didn't enter the server name correctly"

    //     setErrors(errors)
    // }, [enteredTitle])

    const handleDelete = () => {

        // setHasSubmitted(true)
        if (enteredTitle === server.title) {
            dispatch(deleteServerThunk(server.id))
            dispatch(getServersThunk())
            closeModal()
            // setHasSubmitted(false)
            history.push('/')
        } else {
            setErrors("You didn't enter the server name correctly")
        }
    }

    return (

        <div>
            <h1>Delete '{server.name}'</h1>
            <p>Are you sure you want to delete {server.title}? This action cannot be undone.</p>
            <div>
                <label>
                    ENTER SERVER NAME
                    <input
                        type="text"
                        value={enteredTitle}
                        onChange={(e) => setEnteredTitle(e.target.value)}
                    />
                </label>
                {errors && (
                    <p style={{color:"darkred"}}>{errors}</p>
                )}
                <button onClick={closeModal}>Cancel</button>
                <button onClick={handleDelete} type="submit">Delete Server</button>
            </div>

        </div>

    )
}

export default DeleteServerModal
