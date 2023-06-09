import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import "./ServerNavBar.css"
import { logout } from "../../store/session";
import ServersList from '../ServersList';
import Topbar from '../TopBar';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


function ServerNavBar({ isLoaded }) {
  const user = useSelector(state => state.session.user)
  const servers = useSelector(state => state.server.allServers)
  const serversArray = Object.values(servers)
  console.log("🍎servers: ", servers)
  console.log("🍎serversArray at zero: ", serversArray[0])

  const history = useHistory()
  const dispatch = useDispatch()


  if (!user) {
    return <Redirect to="/login" />
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
      )}


      <div className="left-nav-bars-container">
        <div className="top-bar-wrapper">
          <Topbar />
        </div>
        <div className="left-nav-bars">

          <div className="user-info-wrapper">

            <img src={user.profile_pic} className="user-profile-pic"></img>
            <p>{user.username}</p>
            <p>User Settings</p>
            <button onClick={handleLogout}>Logout</button>
          </div>

          <div className="home-main-content-wrapper">
            {/* <img className="home-page-image" src="https://mcdn.wallpapersafari.com/medium/48/64/VQ9gG1.jpg"></img> */}

            {( serversArray[0] && serversArray[0].id) ? (
              <div className="home-main-content-text">
                <h2>Welcome back! Please select a server to get started.</h2>
              </div>
            ) : (
              <div className="home-main-content-text">
              <h2>Welcome! You don't seem to be a member of any server yet. Check out our discover page to find your community! </h2>
              </div>
            )}
          </div>

        </div>

      </div>

    </div >
  )
}

export default ServerNavBar;
