import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getChannelsThunk } from '../../store/channel';

function ChannelsNavBar() {
    const channelsObj = useSelector(state => state.channel.allChannels)
    const channels = Object.values(channelsObj)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChannelsThunk())
    }, [dispatch])

    return (
        <ul>
            {channels.map(channel => (
                <li key={channel.id}>{channel.title}</li>
            ))}
        </ul>
    )
}

export default ChannelsNavBar;
