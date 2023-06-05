import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getServersThunk } from '../../store/server';
import NewServerModal from '../NewServerModal';
import { useModal } from "../../context/Modal";
// import './Navigation.css';

function OpenModalMenuItem({
    modalComponent, // component to render inside the modal
    itemText, // text of the menu item that opens the modal
    onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
  }) {
    const { setModalContent, setOnModalClose } = useModal();
  
    const onClick = () => {
      if (onModalClose) setOnModalClose(onModalClose);
      setModalContent(modalComponent);
      if (onItemClick) onItemClick();
    };
  
    return (
      <div onClick={onClick}>{itemText}</div>
    );
  }

function ServerNavBar({ isLoaded }) {
    const serversObj = useSelector(state => state.server.allServers)
    const servers = Object.values(serversObj)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getServersThunk())
    }, [dispatch])

    console.log("SERVERS: ", serversObj)


    return (
        <ul>
            {servers.map(server => (
                <li key={server.id}>{server.title}</li>
            ))}
            <li>
                <OpenModalMenuItem
                    itemText="Create New Server"
                    modalComponent={ <NewServerModal /> }
                />
            </li>
        </ul>
    )
}

export default ServerNavBar;