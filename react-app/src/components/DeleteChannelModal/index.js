import { useDispatch, useSelector } from "react-redux";
import {useModal} from "../../context/Modal";
import { deleteChannelThunk, getChannelsThunk, getOneChannelThunk } from "../../store/channel";
import { useHistory } from "react-router-dom";
import "./DeleteChannelModal.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function DeleteChannelModal({channel}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal();
    const currentServer = useSelector(state => state.server.currentServer)
    const history = useHistory();

    const handleDelete = () => {
        dispatch(deleteChannelThunk(channel.id))
        dispatch(getChannelsThunk(currentServer.id))
        history.push(`/${currentServer.id}/${currentServer.channels[0].id}`)
        dispatch(getOneChannelThunk(currentServer.channels[0].id))
        closeModal()
    }

    return (

        <div className="delete-channel-container">
            <h1>Delete Channel</h1>
            <p>Are you sure you want to delete #{channel.title}? This cannot be undone.</p>
            <div className="delete-channel-buttons">
            <p onClick={closeModal} className = "delete-channel-cancel">Cancel</p>
            <button onClick={handleDelete} className="delete-channel-delete">Delete Channel</button>

            </div>

        </div>

    )
}

export default DeleteChannelModal
