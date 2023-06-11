import { useDispatch, useSelector } from "react-redux";
import {useModal} from "../../context/Modal";
import { deleteMembershipThunk, getMembershipsThunk } from "../../store/membership";
import { useHistory } from "react-router-dom";
import { clearCurrentServer } from "../../store/server";
import "./LeaveServerModal.css";

function LeaveServerModal ({server}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const membershipsObj = useSelector(state => state.membership.allMemberships)
    const memberships = Object.values(membershipsObj)
    let membershipId;
    const currentUser = useSelector(state => state.session.user)
    const history = useHistory();

    for (let member of memberships) {
        if (member.user_id === currentUser.id) membershipId = member.id
    }

    const handleDelete = () => {
        dispatch(deleteMembershipThunk(membershipId))
        dispatch(getMembershipsThunk(server.id))
        dispatch(clearCurrentServer())
        history.push('/')
        closeModal()
    }

    return (
        <div className="leave-server-container">
            <h1>Leave {server.title}</h1>
            <p>Are you sure you want to leave {server.title}?</p>
            <div className="leave-server-buttons">

            <p onClick={closeModal} className="leave-server-cancel">Cancel</p>
            <button onClick={handleDelete} className="leave-server-leave">Leave Server</button>
            </div>
        </div>
    )

}

export default LeaveServerModal
