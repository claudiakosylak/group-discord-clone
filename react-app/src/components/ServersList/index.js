import { useSelector, useDispatch } from 'react-redux';
import { getServersThunk } from '../../store/server';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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
              <li key={server.id}><NavLink to={`/${server.id}/${server.channels[0].id}`} className="server-icon-buttons" ><img className="server-icons" src={server.preview_icon}></img></NavLink></li>
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
