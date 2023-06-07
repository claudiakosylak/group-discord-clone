import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDiscoverServersThunk, getServersThunk } from '../../store/server';
import { createMembershipThunk } from '../../store/membership';
import { useHistory } from "react-router-dom";



function DiscoverServersIndex () {
    const memberServersObj = useSelector(state => state.server.allServers)
    const memberServers = Object.values(memberServersObj)
    const discoverServersObj = useSelector(state => state.server.discoverServers)
    const user = useSelector(state => state.session.user)
    const history = useHistory()


    const discoverServers = Object.values(discoverServersObj)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getServersThunk())
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
    )
}


export default DiscoverServersIndex
