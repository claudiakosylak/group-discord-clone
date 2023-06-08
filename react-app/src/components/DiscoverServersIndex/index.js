import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDiscoverServersThunk, getServersThunk } from '../../store/server';
import { createMembershipThunk } from '../../store/membership';
import { useHistory } from "react-router-dom";
import ServersList from '../ServersList';
import "./DiscoverServersIndex.css"
import { logout } from "../../store/session";


function DiscoverServersIndex () {
    const memberServersObj = useSelector(state => state.server.allServers)
    const memberServers = Object.values(memberServersObj)
    const discoverServersObj = useSelector(state => state.server.discoverServers)
    const user = useSelector(state => state.session.user)
    const history = useHistory()


    const discoverServers = Object.values(discoverServersObj)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDiscoverServersThunk())
    }, [dispatch])

    if (!user) {
        history.push('/login')
    }

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const handleJoin = async (server) => {
        const membership = {
            role: "member",
            server_id: server.id,
            user_id: user.id
        }

        await dispatch(createMembershipThunk(membership, server.id))
        await dispatch(getDiscoverServersThunk())
        history.push(`/${server.id}/${server.channels[0].id}`)
    }

    return (
        <div className="discover-index-wrapper">
            <div>
                <ServersList />
            </div>
            {user && (
            <div className="user-info-wrapper">

                    <img src={user.profile_pic} className="user-profile-pic"></img>
                    <p>{user.username}</p>
                    <p>User Settings</p>
                    <button onClick={handleLogout}>Logout</button>
            </div>
                )}
            <div>

                <ul>
                {discoverServers.map(server => (
                    <li key={server.id}>
                        <div>
                        {server.title}
                        <button onClick={() => handleJoin(server)}>Join</button>

                        </div>
                        </li>
                ))}
                </ul>
            </div>
        </div>
    )
}


export default DiscoverServersIndex
