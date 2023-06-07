const GET_MEMBERSHIPS = "membership/GET_MEMBERSHIPS"
const GET_ONE_MEMBERSHIP = "membership/GET_ONE_MEMBERSHIP"
const DELETE_MEMBERSHIP = "membership/DELETE_MEMBERSHIP"

const getMembershipsAction = (memberships) => ({
    type: GET_MEMBERSHIPS,
    memberships
})

const getOneMembershipAction = membership => ({
    type: GET_ONE_MEMBERSHIP,
    membership
})

const deleteMembershipAction = membershipId => ({
    type: DELETE_MEMBERSHIP,
    membershipId
})

export const getMembershipsThunk = (serverId) => async dispatch => {
    const res = await fetch(`/api/servers/${serverId}/memberships`)
    if (res.ok) {
        const memberships = await res.json()
        await dispatch(getMembershipsAction(memberships))
        return memberships
    } else {
        const err = await res.json()
        return err
    }
}

export const createMembershipThunk = (membership, serverId) => async dispatch => {
    const res = await fetch(`/api/servers/${serverId}/memberships`, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(membership)
    })

    if (res.ok) {
        const newMembership = await res.json()
        await dispatch(getOneMembershipAction(newMembership))
        return newMembership
    } else {
        const err = await res.json()
        return err
    }
}

export const deleteMembershipThunk = (membershipId) => async dispatch => {
    const res = await fetch(`/api/memberships/${membershipId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const deleteMembership = await res.json()
        await dispatch(deleteMembershipAction(membershipId))
        return deleteMembership
    } else {
        const err = await res.json()
        return err
    }
}

const initialState = { allMemberships: {}, currentMember: {}}

const membershipReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_MEMBERSHIPS:
            const membershipState = {...state, allMemberships: {}, currentMember: {}}
            membershipState.allMemberships = action.memberships
            return membershipState
        case GET_ONE_MEMBERSHIP:
            const memberState = {...state, allMemberships: {}, currentMember: {}}
            memberState.currentMember = action.membership
            return memberState
        case DELETE_MEMBERSHIP:
            const deleteMemberState = {...state, allMemberships: {...state.allMemberships}, currentMember: {}}
            delete deleteMemberState.allMemberships[action.membershipId]
            return deleteMemberState
        default:
            return state
    }
}

export default membershipReducer
