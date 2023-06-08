import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDiscoverServersThunk, getServersThunk } from '../../store/server';
import { createMembershipThunk } from '../../store/membership';
import { useHistory } from "react-router-dom";
import ServersList from '../ServersList';
import "./DiscoverServersIndex.css"



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

    const handleJoin = async (serverId) => {
        const membership = {
            role: "member",
            server_id: serverId,
            user_id: user.id
        }

        await dispatch(createMembershipThunk(membership, serverId))
        await dispatch(getDiscoverServersThunk())
        history.push("/")
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
            </div>
                )}
            <div>

                <ul>
                {discoverServers.map(server => (
                    <li key={server.id}>
                        <div>
                        {server.title}
                        <button onClick={() => handleJoin(server.id)}>Join</button>

                        </div>
                        </li>
                ))}
                </ul>
            </div>
        </div>
    )
}


export default DiscoverServersIndex
