import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getServersThunk } from "../../store/server";
import { logout } from "../../store/session";


function UserProfilePage() {

    const user = useSelector(state => state.session.user);
    const servers = useSelector(state => state.server.allServers)
    const history = useHistory();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getServersThunk())
      }, [])

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push('/login')
    }

    const editProfile = (e) => {
        e.preventDefault();
        history.push(`/users/${user.id}/update`)
    }

    const deleteAccount = (e) => {
        e.preventDefault();
        //make delete user route
        history.push('/login')
    }

    return (

        <div className="all-content-container">
            <div className="left-side-bar">
                <div>
                    <p>MY SERVERS</p>
                    <ul>
                        { Object.values(servers).length ?
                            Object.values(servers).map(server => (
                                <li key={server.id}>
                                        <img src={server.preview_image}/>
                                        <NavLink to={`/${server.id}/${server.channels[0].id}`}> {server.title}</NavLink>
                                </li>
                            ))
                            :
                            <div>
                                <li>You haven't joined any servers yet</li>
                                <NavLink to="/discover"></NavLink>
                            </div>
                        }
                    </ul>
                </div>
                <div onClick={handleLogout}>
                    <p>Logout</p>
                    <p>Icon</p>
                </div>
            </div>
            <div className="profile-user-info-container">
                <div className="user-info-title-bar">
                    <p>My Account</p>
                    <p>x button if time</p>
                </div>
                <div className="profile-page-user-info">
                        <div className="banner-color-bar"></div>
                        <div className="profile--user-info-header">
                            <div>
                                <img></img>
                                <button className="edit-user-profile" onClick={editProfile}>Edit User Profile</button>
                            </div>
                        </div>
                        <div className="user-info-body">
                            <div className="user-info-username-container">
                                <div className="user-info-small-container">
                                    <div className="user-info-display">
                                        <p>USERNAME</p>
                                        <p>{user.username}</p>
                                    </div>
                                    <button className="edit-button" onClick={editProfile}>Edit</button>
                                </div>
                                <div className="user-info-small-container">
                                    <div className="user-info-display">
                                        <p>EMAIL</p>
                                        <p>{user.email}</p>
                                    </div>
                                    <button className="edit-button" onClick={editProfile}>Edit</button>
                                </div>
                                <div className="user-info-small-container">
                                    <div className="user-info-display">
                                        <p>ABOUT ME</p>
                                        <p>{user.about}</p>
                                    </div>
                                        <button className="edit-button" onClick={editProfile}>Edit</button>
                                </div>
                                <button></button>
                            </div>
                        </div>
                        <div>
                            <p>ACCOUNT REMOVAL</p>
                            <p>Are you sure you want to delete your account?</p>
                            <button onClick={deleteAccount}>Delete Account</button>
                        </div>
                </div>
            </div>
        </div>
    )

}


export default UserProfilePage
