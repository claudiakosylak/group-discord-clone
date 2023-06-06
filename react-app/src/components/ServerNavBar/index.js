import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneServerThunk, getServersThunk } from '../../store/server';
import NewServerModal from '../NewServerModal';
import { useModal } from "../../context/Modal";
import "./ServerNavBar.css"
import { getChannelsThunk } from '../../store/channel';
import NewChannelModal from '../CreateChannelModal';
import EditChannelModal from '../EditChannelComponent';
import EditServerModal from '../EditServerModal';

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
  const [activeChannel, setActiveChannel] = useState("")
  const user = useSelector(state => state.session.user)

  console.log("&&&&&& SERVERSOBJ: ", serversObj)
  console.log("^^^^^^ ACTIVE SERVER ID", activeServer)
  console.log("******** ACTIVE SERVER ", serversObj[activeServer])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getServersThunk())
  }, [dispatch])

  useEffect(() => {
    dispatch(getChannelsThunk(activeServer))

  }, [dispatch, activeServer])

  const changeServer = (id) => {
    console.log("INSIDE CHANGE SERVER ID: ", id)
    setActiveServer(id)
  }

  const changeChannel = (id) => {
    console.log("INSIDE CHANGE CHANNEL ID: ", id)
    setActiveChannel(id)
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
              modalComponent={<NewServerModal />}
            />
          </li>
        </ul>
        <div>
          {(activeServer && serversObj[activeServer].owner_id === user.id)&& (
            <OpenModalMenuItem
              itemText="Server Settings"
              modalComponent={<EditServerModal server={serversObj[activeServer]} />}
            />
          )}
          <ul>
            <div className="channels-header"><p>CHANNELS</p>
              <OpenModalMenuItem
                itemText="+"
                modalComponent={<NewChannelModal serverId={activeServer} />}
              />
            </div>
            {activeServer && (
              channels.map(channel => (
                <div className="channel-menu-item">
                  <li key={channel.id} ><button onClick={() => changeChannel(channel.id)}>{channel.title}</button></li>
                  {(activeChannel === channel.id) && (
                    <OpenModalMenuItem
                      itemText="Edit"
                      modalComponent={<EditChannelModal channel={channel} />} />
                  )}
                </div>
              ))
            )}
          </ul>

        </div>

      </div>

    </div>
  )
}

export default ServerNavBar;
