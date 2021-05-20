import React, {useEffect, useState} from "react";
import {ViewportContextProvider} from "./contexts/viewport"


import AuthForm from "./components/pages/AuthForm";
import TrainingPage from "./components/pages/TrainingPage";
import AddCard from "./components/pages/AddCard";
import Navbar from "./components/molecules/Navbar";
import LoadingAppGif from "./components/molecules/LoadingAppGif";
import Stats from "./components/pages/Stats";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {axiosInstance, setAuthToken} from "./server";


function App() {
  const [user, setUser] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    checkIfUserIsAuthed()
  }, []);

  return (
    <BrowserRouter>
      <ViewportContextProvider>
        <div className="App">
          <Navbar user={user} logout={logout}/>
          {isLoading && (
            <LoadingAppGif/>
          )}
          <Switch>
            {user && (
              <>
                <Route path="/" exact component={TrainingPage}/>
                <Route path="/add" component={AddCard}/>
                <Route path="/stats" component={Stats}/>
              </>
            )}
            {!user && (
              <>
                <Route path="/login" exact>
                  <AuthForm action="login" onTokenAcquisition={getUserWithToken}/>
                </Route>
                <Route path="/register" exact>
                  <AuthForm action="register" onTokenAcquisition={getUserWithToken}/>
                </Route>
              </>
            )}
          </Switch>
        </div>
      </ViewportContextProvider>
    </BrowserRouter>
  );

  function logout() {
    axiosInstance.get('/users/logout').then(() => {
      localStorage.removeItem('auth-token');
      setAuthToken(null);
      setUser(undefined);
    })
  }

  function getUserWithToken(token, isAfterLogging = false) {
    axiosInstance.get('/users/connectedUser').then((user) => {
      setLoading(false);
      localStorage.setItem('auth-token', token);
      setAuthToken(token);
      setUser(user);
      if (isAfterLogging) {
        document.location.replace('/stats');
      }
    })
  }

  function checkIfUserIsAuthed() {
    const token = localStorage.getItem('auth-token');
    if (token !== null) {
      getUserWithToken(token);
    }
  }
}

export default App;
