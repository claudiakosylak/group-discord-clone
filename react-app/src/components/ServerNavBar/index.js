import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import "./ServerNavBar.css"
import { logout } from "../../store/session";
import ServersList from '../ServersList';
import Topbar from '../TopBar';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import OpenCreateServerButton from '../OpenCreateServerButton';
import NewServerModal from '../NewServerModal';


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
          {/* <Topbar /> */}
        </div>
        <div className="left-nav-bars" id='homepage-left-navbars'>



          <div className="home-main-content-wrapper">
            {/* <img className="home-page-image" src="https://mcdn.wallpapersafari.com/medium/48/64/VQ9gG1.jpg"></img> */}

            {( serversArray[0] && serversArray[0].id) ? (
              <div className="home-main-content-text">
                <h2>Welcome back!</h2>
                <h2>Select a server to get started</h2>
              </div>
            ) : (
              <div className="home-main-content-text">
                <h2>Welcome!</h2>
                <h2>You don't seem to be a member of any server yet. Check out our discover page to find your community!</h2>
              </div>
            )}
          <p id='home-page-or'>or</p>
          <NavLink to="/discover" id='home-page-discover-link-container'>
            <div id='home-page-discover-link'>
              <div id='compass-and-text'>
                <i class="fa-solid fa-compass" id='discover-compass'></i>
                <p id='discover-link-text'>Explore Disoverable Servers</p>
              </div>
                <i class="fa-solid fa-angle-right" id='discover-arrow'></i>
            </div>
          </NavLink>


        </div>
        <div className="user-info-wrapper" id='homepage-user-info-wrapper'>
                        <div className="user-info-wrapper-userinfo">
                            <img src={user.profile_pic} className="user-profile-pic"></img>
                            <p>{user.username}</p>
                        </div>
                        <button onClick={handleLogout}><i class="fa-solid fa-person-through-window"></i></button>
                </div>
          </div>
      </div>

    </div >
  )
}

export default ServerNavBar;
