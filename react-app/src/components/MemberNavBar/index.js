import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import membershipReducer, { getMembershipsThunk } from '../../store/membership';
import "./MemberNavBar.css"


function MembershipNavBar ({server}) {
    const dispatch = useDispatch()
    const membershipsObject = useSelector(state => state.membership.allMemberships)
    const memberships = Object.values(membershipsObject)

    useEffect(() => {
        dispatch(getMembershipsThunk(server.id))
    }, [dispatch, server])


    return (
        <div className="member-list-outer-wrapper">
            <ul className="memberships-list-container">
                <li className="member-list-item"><img className="members-pic" src={server.user.profile_pic}></img><span className="members-username">{server.user.username}</span><span className="crown">👑</span></li>
            {memberships.map(membership => (
                <li className="member-list-item " key={membership.id}><img className="members-pic" src={membership.user.profile_pic}></img><span className="members-username">{membership.user.username.length < 12 ? membership.user.username : membership.user.username.substring(0, 12) + "..."}</span></li>
            ))}
            </ul>
        </div>
    )
}




export default MembershipNavBar
