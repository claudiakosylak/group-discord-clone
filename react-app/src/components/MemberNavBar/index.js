import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { getMembershipsThunk } from '../../store/membership';


function MembershipNavBar ({server}) {
    const dispatch = useDispatch()
    const membershipsObject = useSelector(state => state.membership.allMemberships)
    const memberships = Object.values(membershipsObject)

    useEffect(() => {
        dispatch(getMembershipsThunk(server.id))
    }, [dispatch, server])


    return (
        <div>
            <ul className="memberships-list-container">
            {memberships.map(membership => (
                <li key={membership.id}>{membership.user.username}</li>
            ))}
            </ul>
        </div>
    )
}




export default MembershipNavBar
