import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteServerThunk, getServersThunk } from "../../store/server";
import { useState, useEffect } from "react";
import "./DeleteServerModal.css";

function DeleteServerModal({ server }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const [enteredTitle, setEnteredTitle] = useState("");
    const [errors, setErrors] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false)

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
            history.push('/home')
        } else {
            setErrors("You didn't enter the server name correctly")
        }
    }

    return (

        <div className="delete-server-container">
            <h1>Delete {`'${server.title}'`}</h1>
            <p className="delete-server-text">Are you sure you want to delete {server.title}? This action cannot be undone.</p>
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
                    <p className="create-server-errors delete-server-error">{errors}</p>
                )}
                <div className="delete-server-buttons">

                    <p className="delete-server-cancel" onClick={closeModal}>Cancel</p>
                    <button className="delete-server-delete" onClick={handleDelete} type="submit">Delete Server</button>
                </div>
            </div>

        </div>

    )
}

export default DeleteServerModal
