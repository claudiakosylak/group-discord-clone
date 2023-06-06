const GET_MEMBERSHIPS = "membership/GET_MEMBERSHIPS"

const getMembershipsAction = (memberships) => ({
    type: GET_MEMBERSHIPS,
    memberships
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

const initialState = { allMemberships: {}, currentMember: {}}

const membershipReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_MEMBERSHIPS:
            const membershipState = {...state, allMemberships: {}, currentMember: {}}
            membershipState.allMemberships = action.memberships
            return membershipState
        default:
            return state
    }
}

export default membershipReducer
