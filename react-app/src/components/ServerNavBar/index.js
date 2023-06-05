import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getServersThunk } from '../../store/server';
// import './Navigation.css';

function ServerNavBar({ isLoaded }) {
    const serversObj = useSelector(state => state.server.allServers)
    const servers = Object.values(serversObj)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getServersThunk())
    }, [dispatch])

    console.log("SERVERS: ", serversObj)


    return (
        <ul>
            {servers.map(server => (
                <li key={server.id}>{server.title}</li>
            ))}
        </ul>
    )

}

export default ServerNavBar;