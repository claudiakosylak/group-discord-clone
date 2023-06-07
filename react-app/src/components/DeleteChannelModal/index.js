import { useDispatch } from "react-redux";
import {useModal} from "../../context/Modal";
import { deleteChannelThunk, getChannelsThunk } from "../../store/channel";

function DeleteChannelModal({channel}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal();



    const handleDelete = () => {
        dispatch(deleteChannelThunk(channel.id))
        dispatch(getChannelsThunk(channel.server_id))
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
