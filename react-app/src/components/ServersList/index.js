import { useSelector, useDispatch } from 'react-redux';
import { getServersThunk } from '../../store/server';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import OpenCreateServerButton from '../OpenCreateServerButton';
import NewServerModal from '../NewServerModal';
import "./ServersList.css"
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';



function ServersList() {
    const serversObj = useSelector((state) => state.server.allServers);
    const servers = Object.values(serversObj);
    const serverId = useParams()


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
              <OpenCreateServerButton

                buttonText="+"
                modalComponent={<NewServerModal />}
              />
                <NavLink to="/discover" className="discover-button-link discover-button server-icon-buttons"><i class="fa-solid fa-compass"></i></NavLink>
          </ul>
        </div>
    )
}

export default ServersList
