const GET_MEMBERSHIPS = "membership/GET_MEMBERSHIPS"
const GET_ONE_MEMBERSHIP = "membership/GET_ONE_MEMBERSHIP"

const getMembershipsAction = (memberships) => ({
    type: GET_MEMBERSHIPS,
    memberships
})

const getOneMembershipAction = membership => ({
    type: GET_ONE_MEMBERSHIP,
    membership
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
        default:
            return state
    }
}

export default membershipReducer
