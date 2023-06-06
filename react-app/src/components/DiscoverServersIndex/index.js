import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDiscoverServersThunk, getServersThunk } from '../../store/server';



function DiscoverServersIndex () {
    const memberServersObj = useSelector(state => state.server.allServers)
    const memberServers = Object.values(memberServersObj)
    const discoverServersObj = useSelector(state => state.server.discoverServers)

    const discoverServers = Object.values(discoverServersObj)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getServersThunk())
        dispatch(getDiscoverServersThunk())
    }, [dispatch])



    return (
        <div>
            <ul>
            {discoverServers.map(server => (
                <li key={server.id}>
                    <div>
                    {server.title}


                    </div>
                    </li>
            ))}

            </ul>
        </div>
    )
}


export default DiscoverServersIndex
