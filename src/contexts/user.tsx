/**
 * This file has to contain every user value
 * and possible methods to change it
 */
import React, {
  createContext, ReactNode, useEffect, useMemo, useState,
} from 'react';
import User from "../types/User";
import {axiosInstance, postOnServer, setAuthToken} from "../services/server";
import {addNotification} from "../services/notification";
import handleError from "../services/errors";

type UserContextType = {
  selectedCategory: string | null,
  // @ts-ignore
  setSelectedCategory: (_category: string | null) => void,

  user: User,
  setUser: (_user: User) => void,
  setCategoryDisplayState: (_isDisplayed: boolean) => void,
}

const userInitialValues: UserContextType = {} as UserContextType;

export const UserContext = createContext(userInitialValues);

type UserContextProviderProps = {
  children: ReactNode
}

export function UserContextProvider(
  {children}: UserContextProviderProps,
) {
  const [user, setUser] = useState<User>({} as User)
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');
  const [isInitialized, setInitializationState] = useState(false);
  let isMounted = true;

  const userContextValue = useMemo(
    () => (
      {
        selectedCategory,
        setSelectedCategory,
        user,
        setUser,
        setCategoryDisplayState
      }),
    [selectedCategory, user],
  );

  useEffect(onUserUpdate, [user])
  useEffect(onMount, [])

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );

  /**
   * Update the User's choice
   * @param _isDisplayed
   */
  function setCategoryDisplayState(_isDisplayed: boolean) {
    console.log(user);
    setUser({
      ...user,
      hasCategoriesDisplayed: _isDisplayed,
    })
  }

  function onUserUpdate() {

    if (isMounted && isInitialized) {
      updateUser();
    }

    return () => {
      isMounted = false;
    }
  }

  function onMount() {
    if (isMounted) {
      checkIfUserIsAuthed();
    }

    return () => {
      isMounted = false;
    }
  }


  function checkIfUserIsAuthed() {
    const token = localStorage.getItem('auth-token');
    if (token !== null) {
      setAuthToken(token);
      fetchUser();
    }
  }

  /**
   * Fetch the User's data in DB according to saved token in Local Storage
   * Update the user State and the initialisation State
   */
  function fetchUser() {
    axiosInstance.get<User>('/users/connectedUser')
      .then((response) => {
        setInitializationState(true);
        setUser(response.data);
      }).catch(handleError);
  }

  /**
   * Update the user in the server according to new data
   */
  function updateUser() {
    console.log(user);
    // Update user in DB here
    postOnServer('/users/connectedUser/preferences/update', {
      hasCategoriesDisplayed: user.hasCategoriesDisplayed
    })
      .then(response => {
        addNotification();
      })
  }
}
