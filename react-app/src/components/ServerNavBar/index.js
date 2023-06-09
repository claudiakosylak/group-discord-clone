import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import "./ServerNavBar.css"
import { logout } from "../../store/session";
import ServersList from '../ServersList';
import Topbar from '../TopBar';


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

            {user && (
            <div className="user-info-wrapper">

                    <img src={user.profile_pic} className="user-profile-pic"></img>
                    <p>{user.username}</p>
                    {/* <p>User Settings</p> */}
                    <button onClick={handleLogout}>Logout</button>
            </div>
              )}

            </div>

          </div>
        )}
      </div >
  )
}

export default ServerNavBar;
