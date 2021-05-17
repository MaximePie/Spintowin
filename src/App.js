import React, {useEffect, useState} from "react";
import AuthForm from "./components/pages/AuthForm";
import TrainingPage from "./components/pages/TrainingPage";
import AddCard from "./components/pages/AddCard";
import Stopwatch from "./components/molecules/Stopwatch";
import Stats from "./components/pages/Stats";
import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom";
import {axiosInstance, setAuthToken} from "./server";

function App() {
  const [user, setUser] = useState(undefined);
  useEffect(checkIfUserIsAuthed, []);
  return (
    <BrowserRouter>
      <div className="App">
        <div className="Navbar">
          {user && (
            <>
              <div className="Navbar__right">
                <NavLink
                  activeClassName="Navbar__link--active"
                  className="Navbar__link"
                  to='/'
                  exact
                >
                  🥋 S'entraîner
                </NavLink>
                <NavLink
                  to='/add'
                  className="Navbar__link"
                  activeClassName="Navbar__link--active"
                  exact
                >
                  ➕ Ajouter
                </NavLink>
                <NavLink
                  to='/stats'
                  className="Navbar__link"
                  activeClassName="Navbar__link--active"
                  exact
                >
                  🤔 Stats
                </NavLink>
                <Stopwatch className="Navbar__stopwatch"/>
              </div>
              <div className="Navbar__left">
                <button
                  className="Navbar__link"
                  onClick={logout}
                >
                  Se déconnecter
                </button>
              </div>
            </>
          )}
          {!user && (
            <>
              <span/>
              <div className="Navbar__left">
                <NavLink
                  to='/login'
                  className="Navbar__link"
                  activeClassName="Navbar__link--active"
                  exact
                >
                  Se connecter
                </NavLink>
                <NavLink
                  to='/register'
                  className="Navbar__link"
                  activeClassName="Navbar__link--active"
                  exact
                >
                  Créer un compte
                </NavLink>
              </div>
            </>
          )}
        </div>
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
