import { useDispatch, useSelector } from "react-redux";
import {useModal} from "../../context/Modal";
import { deleteMembershipThunk, getMembershipsThunk } from "../../store/membership";

function LeaveServerModal ({server}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const membershipsObj = useSelector(state => state.membership.allMemberships)
    const memberships = Object.values(membershipsObj)
    let membershipId;
    const currentUser = useSelector(state => state.session.user)

    for (let member of memberships) {
        if (member.user_id === currentUser.id) membershipId = member.id
    }

    const handleDelete = () => {
        dispatch(deleteMembershipThunk(membershipId))
        dispatch(getMembershipsThunk(server.id))
        closeModal()
    }

    return (
        <div>
            <h1>Leave {server.title}</h1>
            <p>Are you sure you want to leave {server.title}?</p>
            <button onClick={closeModal}>Cancel</button>
            <button onClick={handleDelete}>Leave Server</button>
        </div>
    )

}

export default LeaveServerModal
