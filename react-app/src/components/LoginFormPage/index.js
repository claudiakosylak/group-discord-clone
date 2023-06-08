import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

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
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button onClick={() => demoUserLogin()}>Demo User</button>
        <button onClick={() => demoUserLoginTwo()}>Demo User Two</button>
      </form>
      <p>Need an account?</p>
      <NavLink to='/signup'>Register</NavLink>
    </>
  );
}

export default LoginFormPage;
