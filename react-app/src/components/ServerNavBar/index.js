import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import './Navigation.css';

function ServerNavBar({ isLoaded }) {

    return (
        <ul>
         {isLoaded && (
				<li>
                    example server
				</li>
			)}
        </ul>
    )

}

export default ServerNavBar;