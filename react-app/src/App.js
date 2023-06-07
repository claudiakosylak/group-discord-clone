import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
<<<<<<< HEAD
import ServerNavBar from "./components/ServerNavBar";
import DiscoverServersIndex from "./components/DiscoverServersIndex";
=======
import UpdateUser from "./components/UpdateUserForm";
>>>>>>> update-user

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {sessionUser && (
              <ServerNavBar isLoaded={isLoaded} />
            )}
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
<<<<<<< HEAD
          <Route path="/discover">
            <DiscoverServersIndex />
=======
          <Route path="/users/:userId/update">
            <UpdateUser />
>>>>>>> update-user
          </Route>
        </Switch>
      )}

    </>
  );
}

export default App;
