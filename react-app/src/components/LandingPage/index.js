import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LandingPage.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom";


function LandingPage() {


    return (
        <div className="landing-page-container">
            <div className="landing-page-wrapper">
                <div id="landing-page-navbar">
                    <div id="landing-page-logo-container">
                        <img src="" />
                        <p>Discordia</p>
                    </div>
                    <div id="landing-page-navbar-buttons-container">
                        <button id="landing-page-signup-navbar-button">Sign Up</button>
                        <button id="landing-page-login-navbar-button">Login</button>
                    </div>
                </div>
                <div id="landing-page-top-banner-container">
                    <div id="landing-background-banner-container">
                        <img src="https://discord.com/assets/e6d57714479874c665b36c7adee76b1d.svg"/>
                        <div id="top-banner-background-split-container">
                            <img src="https://discord.com/assets/8a8375ab7908384e1fd6efe408284203.svg" />
                            <img src="https://discord.com/assets/c40c84ca18d84633a9d86b4046a91437.svg" />
                        </div>
                    </div>
                    <div id="top-banner-header-container">
                        <h1 id="top-banner-header">IMAGINE A PLACE...</h1>
                        <p id="top-banner-subheader">
                            ...where you can belong to a school club, a gaming group,
                            or a worldwide art community. Where just you and a handful of friends can spend time
                            together. A place that makes it easy to talk every day and hang out more often.
                        </p>
                        <div id="top-banner-buttons-container">
                            <button id="banner-signup-button">Sign Up</button>
                            <button id="banner-login-button">Login</button>
                        </div>
                    </div>
                </div>
                <div id="banner-two-container">
                    <div id="banner-two-content-wrapper">
                        <img id='banner-two-image' src="https://discord.com/assets/46b2132c01604c9493d558de444929f4.svg" />
                        <div id="banner-two-text-container">
                            <h2 id="banner-two-header">Create an invite-only place where you belong</h2>
                            <p id="banner-two-text">Discordia servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="landing-page-footer-container">
                <div id="landing-page-footer-wrapper">
                    <p>Meet the Devs</p>
                    <div id="dev-info-wrapper">
                        <div className="dev-wrapper">
                            <img src=""/>
                            <div className="dev-info">
                                <p className="cool-kids-names">Claudia Kosylak</p>
                                <button id="claudia-github"><i class="fa-brands fa-github"></i></button>
                                <button id="claudia-linkedin"><i class="fa-brands fa-linkedin"></i></button>
                            </div>
                        </div>
                        <div className="dev-wrapper">
                            <img src=""/>
                            <div className="dev-info">
                                <p className="cool-kids-names">Hanna Rosenfeld</p>
                                <button id="hanna-github"><i class="fa-brands fa-github"></i></button>
                                <button id="hanna-linkedin"><i class="fa-brands fa-linkedin"></i></button>
                            </div>
                        </div>
                        <div className="dev-wrapper">
                            <img src=""/>
                            <div className="dev-info">
                                <p className="cool-kids-names">James Lee</p>
                                <button id="james-github"><i class="fa-brands fa-github"></i></button>
                                <button id="james-linkedin"><i class="fa-brands fa-linkedin"></i></button>
                            </div>
                        </div>
                        <div className="dev-wrapper">
                            <img src=""/>
                            <div className="dev-info">
                                <p className="cool-kids-names">Matt McBurnett</p>
                                <button id="matt-github"><i class="fa-brands fa-github"></i></button>
                                <button id="matt-linkedin"><i class="fa-brands fa-linkedin"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
