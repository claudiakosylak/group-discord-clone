import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
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
import { logout } from "../../store/session";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import ServersList from '../ServersList';
import Topbar from '../TopBar';


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
  const allMemberships = useSelector(state => state.membership.allMemberships)
  console.log("ALL MEMBERSHIPS: ", allMemberships)
  const memberships = Object.values(allMemberships)
  const history = useHistory()

  console.log("&&&&&& SERVERSOBJ: ", serversObj)
  console.log("^^^^^^ ACTIVE SERVER ID", activeServer)
  console.log("******** ACTIVE SERVER ", serversObj[activeServer])
  const dispatch = useDispatch()

  // if (!user) {
  //   <Redirect to='/login'/>
  // }

  useEffect(() => {
    dispatch(getServersThunk())
  }, [dispatch, memberships.length])

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
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };


  return (
    <div className="all-content-container">
      <div className="server-list">
          <ServersList />

      </div>

      <div className="left-nav-bars-container">
        <div className="top-bar-wrapper">
          <Topbar />
        </div>
        <div className="left-nav-bars">


          {activeServer && (

          <div>
          
            {(activeServer && serversObj[activeServer].owner_id === user.id) && (
<OpenModalMenuItem
  itemText="Server Settings"
  modalComponent={<EditServerModal server={serversObj[activeServer]} />}
/>
            )}
            {(activeServer && serversObj[activeServer].owner_id !== user.id) && (
              <OpenModalMenuItem
                itemText="Leave Server"
                modalComponent={<LeaveServerModal server={serversObj[activeServer]}/>}
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
          <div>
            <button onClick={handleLogout}>Log Out</button>
          </div>

        </div>

      </div>
      <div>
        {activeServer && (
          <MembershipNavBar server={serversObj[activeServer]} />
        )}
      </div>
    </div>
  )
}

export default ServerNavBar;
