import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ViewportContextProvider } from './contexts/viewport';
import { UserContextProvider } from './contexts/user';
import { PoppingScoreProvider } from './contexts/poppingScore';

import AuthForm from './components/pages/AuthForm/AuthForm';
import Training from './components/pages/Training/Training';
import AddCard from './components/pages/AddCard';
import WelcomePage from './components/pages/WelcomePage';
import Navbar from './components/molecules/Navbar';
import LoadingAppGif from './components/molecules/LoadingAppGif';
import Stats from './components/pages/Stats/Stats';
import { axiosInstance, setAuthToken } from './services/server';
import handleError from './services/errors';
import User from './types/User';
import Quest from './components/pages/Quest/Quest';
import { CoinProvider } from './contexts/coin';

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    checkIfUserIsAuthed();
  }, []);

  return (
    <BrowserRouter>
      <UserContextProvider>
        <ViewportContextProvider>
          <CoinProvider>
            <PoppingScoreProvider>
              <div className="App">
                <Navbar user={user} logout={logout} />
                {isLoading && (
                <LoadingAppGif />
                )}
                {!isLoading && (
                <Routes>
                  {user && (
                    <>
                      <Route path="/" element={<Training />} />
                      <Route path="/add" element={<AddCard />} />
                      <Route path="/stats" element={<Stats />} />
                      <Route path="/quest" element={<Quest />} />
                    </>
                  )}
                  {!user && (
                    <>
                      <Route path="/" element={<WelcomePage />} />
                      <Route
                        path="/login"
                        element={<AuthForm action="login" onTokenAcquisition={getUserWithToken} />}
                      />
                      <Route
                        path="/register"
                        element={<AuthForm action="register" onTokenAcquisition={getUserWithToken} />}
                      />
                    </>
                  )}
                </Routes>
                )}
              </div>
            </PoppingScoreProvider>
          </CoinProvider>
        </ViewportContextProvider>
      </UserContextProvider>

    </BrowserRouter>
  );

  function logout() {
    localStorage.removeItem('auth-token');
    setAuthToken(null);
    setUser(undefined);
    document.location.pathname = '/';
  }

  function getUserWithToken(token: string, isAfterLogging = false) {
    console.log(`Getting user with token${token} and isAfterLogging = ${isAfterLogging}`);
    axiosInstance.get<User>('/users/connectedUser')
      .then((connectedUser) => {
        setLoading(false);
        localStorage.setItem('auth-token', token);
        setAuthToken(token);
        if (connectedUser) {
          setUser(connectedUser.data);
          if (isAfterLogging) {
            document.location.replace('/stats');
          }
        }
      }).catch(handleError);
  }

  function checkIfUserIsAuthed() {
    const token = localStorage.getItem('auth-token');
    if (token !== null) {
      setAuthToken(token);
      getUserWithToken(token);
    } else {
      setLoading(false);
    }
  }
}

export default App;
