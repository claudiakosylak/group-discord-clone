import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneServerThunk, getServersThunk } from '../../store/server';
import NewServerModal from '../NewServerModal';
import { useModal } from "../../context/Modal";
import "./ServerNavBar.css"
import { getChannelsThunk } from '../../store/channel';
// import './Navigation.css';

function OpenModalMenuItem({
    modalComponent, // component to render inside the modal
    itemText, // text of the menu item that opens the modal
    onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
  }) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
      if (onModalClose) setOnModalClose(onModalClose);
      setModalContent(modalComponent);
      if (onItemClick) onItemClick();
    };

    return (
      <div onClick={onClick}>{itemText}</div>
    );
  }

function ServerNavBar({ isLoaded }) {
    const serversObj = useSelector(state => state.server.allServers)
    const servers = Object.values(serversObj)
    let channelsObj = useSelector(state => state.channel.allChannels)
    let channels = Object.values(channelsObj)
    const [activeServer, setActiveServer] = useState("")


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getServersThunk())
    }, [dispatch])

    useEffect(() => {
      dispatch(getChannelsThunk(activeServer))
    }, [dispatch, activeServer])

    console.log("SERVERS: ", serversObj)

    const changeServer = (id) => {
      console.log("INSIDE CHANGE SERVER ID: ", id)
      setActiveServer(id)
    }


    return (
      <div className="left-nav-bars-container">
      <div className="left-nav-bars">
        <ul>
            {servers.map(server => (
                <li key={server.id}><button onClick={() => changeServer(server.id)}><img className="server-icons" src={server.preview_icon}></img></button></li>
            ))}
            <li>
                <OpenModalMenuItem
                    itemText="Create New Server"
                    modalComponent={ <NewServerModal /> }
                />
            </li>
        </ul>
        <ul>
          {activeServer && (
            channels.map(channel => (
              <li key={channel.id}>{channel.title}</li>
            ))
          )}
        </ul>

      </div>

      </div>
    )
}

export default ServerNavBar;
