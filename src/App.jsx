import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ViewportContextProvider } from './contexts/viewport';

import AuthForm from './components/pages/AuthForm';
import TrainingPage from './components/pages/TrainingPage';
import AddCard from './components/pages/AddCard';
import WelcomePage from './components/pages/WelcomePage';
import ReviewPage from './components/pages/ReviewPage';
import Navbar from './components/molecules/Navbar';
import LoadingAppGif from './components/molecules/LoadingAppGif';
import Stats from './components/pages/Stats';
import { axiosInstance, setAuthToken } from './services/server';
import handleError from './services/errors';

function App() {
  const [user, setUser] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    checkIfUserIsAuthed();
  }, []);

  return (
    <BrowserRouter>
      <ViewportContextProvider>
        <div className="App">
          <Navbar user={user} logout={logout} />
          {isLoading && (
            <LoadingAppGif />
          )}
          {!isLoading && (
            <Switch>
              {user && (
                <>
                  <Route path="/" exact component={TrainingPage} />
                  <Route path="/review" exact component={ReviewPage} />
                  <Route path="/add" component={AddCard} />
                  <Route path="/stats" component={Stats} />
                </>
              )}
              {!user && (
                <>
                  <Route path="/" exact component={WelcomePage} />
                  <Route path="/login" exact>
                    <AuthForm action="login" onTokenAcquisition={getUserWithToken} />
                  </Route>
                  <Route path="/register" exact>
                    <AuthForm action="register" onTokenAcquisition={getUserWithToken} />
                  </Route>
                </>
              )}
            </Switch>
          )}
        </div>
      </ViewportContextProvider>
    </BrowserRouter>
  );

  function logout() {
    axiosInstance.get('/users/logout').then(() => {
      localStorage.removeItem('auth-token');
      setAuthToken(null);
      setUser(undefined);
      document.location.pathname = '/';
    });
  }

  function getUserWithToken(token, isAfterLogging = false) {
    axiosInstance.get('/users/connectedUser').then((connectedUser) => {
      setLoading(false);
      localStorage.setItem('auth-token', token);
      setAuthToken(token);
      setUser(connectedUser);
      if (isAfterLogging) {
        document.location.replace('/stats');
      }
    }).catch(handleError);
  }

  function checkIfUserIsAuthed() {
    const token = localStorage.getItem('auth-token');
    if (token !== null) {
      getUserWithToken(token);
    } else {
      setLoading(false);
    }
  }
}

export default App;
