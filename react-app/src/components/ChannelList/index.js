import { useSelector, useDispatch } from 'react-redux';
import { getServersThunk } from '../../store/server';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import NewChannelModal from '../CreateChannelModal';
import EditChannelModal from '../EditChannelComponent';
import "./ChannelList.css"
import { logout } from "../../store/session";



function ChannelList({server}) {
    const channelsObj = useSelector(state => state.channel.allChannels)
    const channels = Object.values(channelsObj)
    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch()


    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
      };


    return (
        <div className="channel-list-container">
            <ul>
                <div className="channels-header"><p>CHANNELS</p>
                    <OpenModalButton
                        buttonText="+"
                        modalComponent={<NewChannelModal serverId={server.id} />}
                    />
                </div>
                {channels.map((channel, idx) => (
                    <div className="channel-menu-item">
                        <li key={channel.id} ><NavLink to={`/${server.id}/${channel.id}`}>{channel.title}</NavLink></li>
                        {idx !== 0 && (
                            <OpenModalButton
                                buttonText="Edit"
                                modalComponent={<EditChannelModal channel={channel} />} />
                        )}
                    </div>
                ))}

            </ul>
                {user && (
            <div className="user-info-wrapper">

                    <img src={user.profile_pic} className="user-profile-pic"></img>
                    <p>{user.username}</p>
                    <p>User Settings</p>
                    <button onClick={handleLogout}>Logout</button>
            </div>
                )}


        </div>
    )

}

export default ChannelList
