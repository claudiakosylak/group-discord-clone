import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './LandingPage.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import MainRight from './main_right_background.83ec969b.svg'
import MainLeft from './main_left_background.svg';
import Main from './background-main.svg';
import BannerTwo from './bannerTwo.svg';


function LandingPage() {
    const history = useHistory();
    const user = useSelector(state => state.session.user)

    const toSignup = () => {
        history.push('/signup')
    }

    const toLogin = () => {
        history.push('/login')
    }

    const toSplash = () => {
        history.push('/')
    }

    return (
        <div className="landing-page-container">
            <div className="landing-page-wrapper">
                <div id="landing-page-navbar">
                    <div onClick={toSplash} id="landing-page-logo-container">
                        <i id='keyboard' className="fa-solid fa-keyboard"></i>
                        <p id="discordia-title">Discordia</p>
                    </div>
                    <div  id="landing-page-navbar-buttons-container">
                        <button onClick={toSignup} id="landing-page-signup-navbar-button">Sign Up</button>
                        <button onClick={toLogin}  id="landing-page-login-navbar-button">Login</button>
                    </div>
                </div>
                <div id="landing-page-top-banner-container">
                    <div id="landing-background-banner-container">
                        <div id="top-banner-background-split-container">
                            <img id="background-left" src={MainLeft} />
                            <img id="background-right" src={MainRight} />
                        </div>
                    </div>
                    <div id="top-banner-header-container">
                        <h1 id="top-banner-header">IMAGINE A PLACE...</h1>
                        <p id="top-banner-subheader">
                            ...with four talented and incredibly employable software engineers. We cloned Discord to show off what we can do!
                            Feel free to take a look around! Discordia is a place that makes it easy to talk every day and hang out more often.
                            Where just you and a handful of friends can spend time together.
                        </p>
                        <div id="top-banner-buttons-container">
                            <button onClick={toSignup} id="banner-signup-button">Sign up for Discordia</button>
                            <button onClick={toLogin} id="banner-login-button">Log in to your account</button>
                        </div>
                    </div>
                </div>
                <div id="banner-two-container">
                    <div id="banner-two-content-wrapper">
                        <img id='banner-two-image' src={BannerTwo} />
                        <div id="banner-two-text-container">
                            <h2 id="banner-two-header">Create a place where you belong</h2>
                            <p id="banner-two-text">Discordia servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="landing-page-footer-container">
                <div id="landing-page-footer-wrapper">
                    <p id="the-devs">The Devs</p>
                    <div id="dev-info-wrapper">
                        <div className="dev-wrapper">
                            <div className="avatar-container">
                                <i id="avatar" className="fa-brands fa-discord"></i>
                            </div>
                            <div className="dev-info">
                                <p className="cool-kids-names">Claudia Kosylak</p>
                                <i className="fa-brands fa-github"></i>
                                <i className="fa-brands fa-linkedin"></i>
                            </div>
                        </div>
                        <div className="dev-wrapper">
                            <div className="avatar-container">
                                <i id="avatar" className="fa-brands fa-discord"></i>
                            </div>
                            <div className="dev-info">
                                <p className="cool-kids-names">Hanna Rosenfeld</p>
                                <i className="fa-brands fa-github"></i>
                                <i className="fa-brands fa-linkedin"></i>
                            </div>
                        </div>
                        <div className="dev-wrapper">
                            <div className="avatar-container">
                                <i id="avatar" className="fa-brands fa-discord"></i>
                            </div>
                            <div className="dev-info">
                                <p className="cool-kids-names">James Lee</p>
                                <i className="fa-brands fa-github"></i>
                                <button id="james-linkedin"><i className="fa-brands fa-linkedin"></i></button>
                            </div>
                        </div>
                        <div className="dev-wrapper">
                            <div className="avatar-container">
                                <i id="avatar" className="fa-brands fa-discord"></i>
                            </div>
                            <div className="dev-info">
                                <p className="cool-kids-names">Matt McBurnett</p>
                                <i className="fa-brands fa-github"></i>
                                <i className="fa-brands fa-linkedin"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
