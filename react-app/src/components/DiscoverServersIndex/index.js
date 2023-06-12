import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDiscoverServersThunk, getServersThunk } from '../../store/server';
import { createMembershipThunk } from '../../store/membership';
import { useHistory } from "react-router-dom";
import ServersList from '../ServersList';
import "./DiscoverServersIndex.css"
import { logout } from "../../store/session";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import kitty from "../../images/discordia-kitty.jpg";


function DiscoverServersIndex() {
    const memberServersObj = useSelector(state => state.server.allServers)
    const memberServers = Object.values(memberServersObj)
    const discoverServersObj = useSelector(state => state.server.discoverServers)
    const user = useSelector(state => state.session.user)
    const history = useHistory()


    const discoverServers = Object.values(discoverServersObj)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDiscoverServersThunk())
    }, [dispatch])

    if (!user) {
        return <Redirect to="/login" />
    }

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const handleJoin = async (server) => {
        const membership = {
            role: "member",
            server_id: server.id,
            user_id: user.id
        }

        await dispatch(createMembershipThunk(membership, server.id))
        await dispatch(getDiscoverServersThunk())
        history.push(`/${server.id}/${server.channels[0].id}`)
    }

    return (
        <div className="discover-index-wrapper">
            <div>
                <ServersList />
            </div>
            <div className="discover-right-side-wrapper">

                {user && (
                    <div className="user-info-wrapper" id='homepage-user-info-wrapper'>
                        <div className="user-info-wrapper-userinfo">
                            <img src={user.profile_pic} className="user-profile-pic"></img>
                            <p>{user.username}</p>
                        </div>
                        <button onClick={handleLogout}><i class="fa-solid fa-person-through-window"></i></button>
                    </div>
                )}

                <div className="discover-header-wrapper">
                    <img className="discover-main-image" src="https://cdn.wallpapersafari.com/90/60/HPfrKl.png"></img>
                    <div className="discover-header-text">
                        <h2>Find your community on Discordia</h2>
                        <p>From gaming, to music, to learning, there's a place for you.</p>
                    </div>
                </div>
                <h3 id='featured-communities'>Featured Communities</h3>

                <ul className='discover-index-grid'>
                    {discoverServers.map(server => (
                        <li key={server.id} className="discover-item">
                            <div className='discover-item-image-container'>
                                <img className="discover-item-image" src={server.preview_icon}></img>
                            </div>
                            <div className="discover-item-text">
                                <h4>{server.title}</h4>
                                <button className="discover-join-button" onClick={() => handleJoin(server)}>Join</button>

                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}


export default DiscoverServersIndex
