import { useSelector, useDispatch } from 'react-redux';
import { getServersThunk } from '../../store/server';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import NewChannelModal from '../CreateChannelModal';
import EditChannelModal from '../EditChannelComponent';
import "./ChannelList.css"
import { logout } from "../../store/session";
import { useParams } from 'react-router-dom/cjs/react-router-dom';



function ChannelList({server}) {
    const channelsObj = useSelector(state => state.channel.allChannels)
    const channels = Object.values(channelsObj)
    const user = useSelector(state => state.session.user)
    const {serverId, channelId} = useParams();

    const dispatch = useDispatch()


    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
      };


    return (
        <div className="channel-list-container">
            <ul>
                <div className="channels-header"><p>CHANNELS</p>
                {user.id === server.owner_id && (
                    <OpenModalButton
                        id="new-channel-button"
                        buttonText="+"
                        modalComponent={<NewChannelModal serverId={server.id} />}
                    />

                )}
                </div>
                {channels.map((channel, idx) => (
                    <>
                    <div className={`channel-menu-item ${channel.id.toString() === channelId ? "active-channel" : ""}`}>
                        <NavLink className="channel-list-item"  to={`/${server.id}/${channel.id}`}><li key={channel.id} className={`channel-list-text ${channel.id.toString() === channelId ? "active-channel-text" : ""}`}><i class="fa-solid fa-hashtag"></i>{channel.title.length < 23 ? channel.title : channel.title.slice(0, 17) + "..."}</li></NavLink>
                        {user.id === server.owner_id && idx !== 0 && (
                            <OpenModalButton
                                buttonText={<i class="fa-solid fa-gear"></i>}
                                modalComponent={<EditChannelModal channel={channel} />} />
                        )}
                    </div>
                    </>
                ))}

            </ul>
                {user && (
                <div className="user-info-wrapper">
                        <div className="user-info-wrapper-userinfo">
                            <img src={user.profile_pic} className="user-profile-pic"></img>
                            <p>{user.username}</p>
                        </div>
                        <button onClick={handleLogout}><i class="fa-solid fa-person-through-window"></i></button>
                </div>
                )}


        </div>
    )

}

export default ChannelList
