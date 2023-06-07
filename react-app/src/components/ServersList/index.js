import { useSelector, useDispatch } from 'react-redux';
import { getOneServerThunk, getServersThunk } from '../../store/server';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import NewServerModal from '../NewServerModal';



function ServersList() {
    const serversObj = useSelector((state) => state.server.allServers);
    const servers = Object.values(serversObj);





    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getServersThunk())
    }, [dispatch])




    return(
        <div>
            <ul className="server-icons-container">
            {servers.map(server => (
              <li key={server.id}><button className="server-icon-buttons" ><img className="server-icons" src={server.preview_icon}></img></button></li>
            ))}
            <li className="create-server-button server-icon-buttons">
              <OpenModalButton

                buttonText="+"
                modalComponent={<NewServerModal />}
              />
            </li>
            <li className="discover-button server-icon-buttons">
                <NavLink to="/discover">🧭</NavLink>
            </li>
          </ul>
        </div>
    )
}

export default ServersList
