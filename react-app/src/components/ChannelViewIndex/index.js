import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ServersList from '../ServersList';
import Topbar from '../TopBar';
import "./ChannelViewIndex.css"
import { useParams } from 'react-router-dom';
import { getOneServerThunk } from '../../store/server';

function ChannelViewIndex() {
    const {serverId, channelId } = useParams()
    const dispatch = useDispatch()
    const server = useSelector(state => state.server.currentServer)
    console.log("CURRENT SERVER: ", server)


    useEffect(() => {
        dispatch(getOneServerThunk(serverId))
    }, [dispatch])
    return (
        <div className="all-content-container">
            <div className="server-list">
                <ServersList />
            </div>
            <div className="right-content-container">
                <div className="top-bar-wrapper">
                    <Topbar server={server}/>
                </div>
            </div>
        </div>
    )
}

export default ChannelViewIndex
