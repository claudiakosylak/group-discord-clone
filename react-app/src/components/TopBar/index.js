import { useSelector } from "react-redux"
import React from 'react'
import './TopBar.css'



function Topbar({server}) {

    const currentServer = useSelector(state => state.server.currentServer)
    const currentChannel = useSelector(state => state.channel.currentChannel)
    const currentUser = useSelector(state => state.session.user)

    // console.log("CURRENT SERVER: ",currentServer)

    return (
        <div className="top-bar-container">
            <div className='topbar-server-title'>
                { currentServer.title ?
                    <p>{currentServer.title}</p>
                    :
                    <p>Select a Server</p>
                }
            </div>
            <div className="top-bar-right-half">
                <div>
                    <div>
                        <p># Icon</p>
                        <p>{currentChannel.title}</p>
                    </div>
                </div>
                <div className="right-right-icons">
                    { (currentServer.title && currentUser && currentServer.owner_id === currentUser.id) && (
                        <p>Server Settings Icon </p>
                        )
                    }
                    { currentServer.title && (
                        <p>Leave Server</p>
                    )
                    }

                </div>
            </div>
        </div>
    )
}

export default Topbar
