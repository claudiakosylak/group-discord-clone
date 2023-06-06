import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteServerThunk, getServersThunk } from "../../store/server";
import { useState } from "react";

function DeleteServerModal({ server }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const [enteredTitle, setEnteredTitle] = useState("");
    const [error, setError] = useState("");

    console.log("SERVER IN MODAL", server)
    console.log("SERVERID IN MODAL", server.id)


    const handleDelete = () => {

        if (enteredTitle === server.title) {
            dispatch(deleteServerThunk(server.id))
            dispatch(getServersThunk())
            closeModal()
        } else {
            setError("You didn't enter the server name correctly")
        }
    }

    return (

        <div>
            <h1>Delete '{server.name}'</h1>
            <p>Are you sure you want to delete {server.title}? This action cannot be undone.</p>
            <div onClick={handleDelete}>
                <label>
                    ENTER SERVER NAME
                    <input
                        type="text"
                        value={enteredTitle}
                        onChange={(e) => setEnteredTitle(e.target.value)}
                    />
                </label>
                {error && (
                    <p>{error}</p>
                )}
                <button onClick={closeModal}>Cancel</button>
                <button type="submit">Delete Server</button>
            </div>

        </div>

    )
}

export default DeleteServerModal
