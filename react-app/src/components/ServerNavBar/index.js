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
import ChannelMessages from '../ChannelMessages';
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
  const user = useSelector(state => state.session.user)

  const history = useHistory()
  const dispatch = useDispatch()







  if (!user) {
    history.push('/login')
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (

      <div className="all-content-container">
        {user && (
          <div className="server-list">
          <ServersList />

          </div>
        ) }

        {user && (
          <div className="left-nav-bars-container">
            <div className="top-bar-wrapper">
              <Topbar />
            </div>
            <div className="left-nav-bars">

              <div>
                <button onClick={handleLogout}>Log Out</button>
              </div>

            </div>

          </div>
        )}
      </div >
  )
}

export default ServerNavBar;
