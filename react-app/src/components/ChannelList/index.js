import { useSelector, useDispatch } from 'react-redux';
import { getServersThunk } from '../../store/server';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import NewChannelModal from '../CreateChannelModal';
import EditChannelModal from '../EditChannelComponent';

function ChannelList({server}) {
    const channelsObj = useSelector(state => state.channel.allChannels)
    const channels = Object.values(channelsObj)
    // const server = useSelector(state => state.session.currentServer)



    return (
        <div>
            <ul>
                <div className="channels-header"><p>CHANNELS</p>
                    <OpenModalButton
                        buttonText="+"
                        modalComponent={<NewChannelModal serverId={server.id} />}
                    />
                </div>
                {channels.map(channel => (
                    <div className="channel-menu-item">
                        <li key={channel.id} ><NavLink to={`/${server.id}/${channel.id}`}>{channel.title}</NavLink></li>
                        <OpenModalButton
                            buttonText="Edit"
                            modalComponent={<EditChannelModal channel={channel} />} />

                    </div>
                ))}

            </ul>
        </div>
    )

}

export default ChannelList
