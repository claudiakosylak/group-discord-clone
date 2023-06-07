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
import MembershipNavBar from '../MemberNavBar';
import LeaveServerModal from '../LeaveServerModal';
import ChannelMessages from '../ChannelMessages';

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
  const [channelId, setChannelId] = useState(null)
  const user = useSelector(state => state.session.user)
  const allMemberships = useSelector(state => state.membership.allMemberships)
  console.log("ALL MEMBERSHIPS: ", allMemberships)
  const memberships = Object.values(allMemberships)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getServersThunk())
  }, [dispatch, memberships.length])

  useEffect(() => {
    dispatch(getChannelsThunk(activeServer))
    setActiveChannel(null)
  }, [dispatch, activeServer])

  useEffect(() => {
    setChannelId(activeChannel)
  }, [activeChannel])

  const changeServer = (id) => {
    setActiveServer(id)
  }

  const changeChannel = (id) => {
    setActiveChannel(id)
  }

  return (
    <div className="all-content-container">
      <div className="left-nav-bars-container">
        <div className="left-nav-bars">
          <ul className="server-icons-container">
            {servers.map(server => (
              <li key={server.id}><button className="server-icon-buttons" onClick={() => changeServer(server.id)}><img className="server-icons" src={server.preview_icon}></img></button></li>
            ))}
            <li className="create-server-button server-icon-buttons">
              <OpenModalMenuItem

                itemText="+"
                modalComponent={<NewServerModal />}
              />
            </li>
            <li className="discover-button server-icon-buttons">
              <NavLink to="/discover">🧭</NavLink>
            </li>
          </ul>
          {activeServer && (

            <div>
              <div className="server-dropdown-container">

              </div>
              {(activeServer && serversObj[activeServer].owner_id === user.id) && (
                <OpenModalMenuItem
                  itemText="Server Settings"
                  modalComponent={<EditServerModal server={serversObj[activeServer]} />}
                />
              )}
              {(activeServer && serversObj[activeServer].owner_id !== user.id) && (
                <OpenModalMenuItem
                  itemText="Leave Server"
                  modalComponent={<LeaveServerModal server={serversObj[activeServer]} />}
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
          )}

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
        {activeChannel && (
          <ChannelMessages channel={activeChannel} server={activeServer} />
        )}
        {/* </ul> */}
      </div>
      {/* </div > */}
      <div>
        {activeServer && (
          <MembershipNavBar server={serversObj[activeServer]} />
        )}
      </div>
    </div >
  )
}

export default ServerNavBar;
