import { useSelector } from "react-redux"
import OpenLeaveServerButton from "../OpenLeaveServerButton"
import React from 'react'
import './TopBar.css'
import LeaveServerModal from "../LeaveServerModal"
import EditServerModal from "../EditServerModal"
import { useParams } from "react-router-dom"
import OpenServerSettingsButton from "../OpenServerSettingsButton"



function Topbar({server}) {

    const currentServer = useSelector(state => state.server.currentServer)
    const currentChannel = useSelector(state => state.channel.currentChannel)
    const currentUser = useSelector(state => state.session.user)
    const {serverId, channelId} = useParams()

    return (
        <div className="top-bar-container">
            <div className='topbar-server-title'>
                { serverId ?
                    <p>{currentServer.title}</p>
                    :
                    <p>Select a Server</p>
                }
            </div>
            <div className="top-bar-right-half">
                <div>
                    <div>
                        {channelId && (
                            <div className="channel-title">
                                <i class="fa-regular fa-hashtag"></i>

                                <p>{currentChannel.title}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="right-right-icons">
                    { (currentServer.title && currentUser && currentServer.owner_id === currentUser.id) && (
                        <OpenServerSettingsButton
                        buttonText="Server Settings"
                        modalComponent={<EditServerModal server={currentServer}/>} />
                        )
                    }
                    { ((currentServer.title && currentUser) && currentServer.owner_id !== currentUser.id) && (
                        <OpenLeaveServerButton
                        buttonText="Leave Server"
                        modalComponent={<LeaveServerModal server={currentServer}/>}/>
                    )
                    }

                </div>
            </div>
        </div>
    )
}

export default Topbar
