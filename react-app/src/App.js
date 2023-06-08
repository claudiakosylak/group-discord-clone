import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormModal from "./components/SignupFormModal";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ServerNavBar from "./components/ServerNavBar";
import DiscoverServersIndex from "./components/DiscoverServersIndex";
import UpdateUser from "./components/UpdateUserForm";
import TopBar from "./components/TopBar";
import ServersList from "./components/ServersList";
import ChannelViewIndex from "./components/ChannelViewIndex";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
        <Switch>
          <Route exact path="/">
            {sessionUser && (
              <ServerNavBar isLoaded={isLoaded} />
            )}
          </Route>
          <Route path="/:serverId/:channelId">
            <ChannelViewIndex />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormModal />
          </Route>
          <Route path="/discover">
            <DiscoverServersIndex />
          </Route>
          <Route path="/users/:userId/update">
            <UpdateUser />
          </Route>
          <Route path="/users/:userId">
          </Route>
        </Switch>


    </>
  );
}

export default App;
