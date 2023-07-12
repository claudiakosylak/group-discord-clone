import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import backgroundImage from './discord-login-background.png'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const history= useHistory();


  if (sessionUser) return <Redirect to="/" />;

  const demoUserLogin = () => {

    return dispatch(login('demo@aa.io', "password")).then(() => history.push('/'))
  }

  const demoUserLoginTwo = () => {
    return dispatch(login("marnie@aa.io", "password")).then(() => history.push('/'))
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className='login-page-container'>
      <img className='login-background-image' src={backgroundImage}/>
      <div className={errors.length ? "login-form-container-errors" : "login-form-container"}>
        <form className='login-form' onSubmit={handleSubmit}>
          <h1 id='login-form-header'>Welcome back!</h1>
          <p id='login-form-tag'>We're so excited to see you again!</p>
          <ul className="wtf-validation">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label className='login-form-label'>
            EMAIL
            <input
              className='login-form-input'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className='login-form-label'>
            PASSWORD
            <input
              className='login-form-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className='login-form-button' type="submit">Log In</button>
        </form>
          <button className='login-form-demo-button' onClick={() => demoUserLogin()}>Login as Demo User One</button>
          <button className='login-form-demo-button' onClick={() => demoUserLoginTwo()}>Login as Demo User Two</button>
        <div className='login-form-register'>
          <p id='login-form-need-account'>Need an account?</p>
          <NavLink id='login-register-link' to='/signup'>Register</NavLink>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
