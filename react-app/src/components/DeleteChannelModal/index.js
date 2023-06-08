import { useDispatch, useSelector } from "react-redux";
import {useModal} from "../../context/Modal";
import { deleteChannelThunk, getChannelsThunk } from "../../store/channel";
import { useHistory } from "react-router-dom";

function DeleteChannelModal({channel}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal();
    const currentServer = useSelector(state => state.server.currentServer)
    const history = useHistory();

    const handleDelete = () => {
        dispatch(deleteChannelThunk(channel.id))
        dispatch(getChannelsThunk(channel.server_id))
        history.push(`/${currentServer.id}/${currentServer.channels[0].id}`)
        closeModal()
    }

    return (

        <div>
            <h1>Delete Channel</h1>
            <p>Are you sure you want to delete #{channel.title}? This cannot be undone.</p>
            <button onClick={closeModal}>Cancel</button>
            <button onClick={handleDelete}>Delete Channel</button>

        </div>

    )
}

export default DeleteChannelModal
