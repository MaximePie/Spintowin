/**
 * This file has to contain every user value
 * and possible methods to change it
 */
import React, {
  createContext, ReactNode, useEffect, useMemo, useState,
} from 'react';
import { ObjectId } from 'bson';
import User from '../types/User';
import { axiosInstance, postOnServer, setAuthToken } from '../services/server';
import { addNotification, userPreferencesSavedNotification } from '../services/notification';
import handleError from '../services/errors';
import UserInterval from '../types/UserInterval';

export type UserContextType = {
  selectedCategory: string | null,
  // @ts-ignore
  setSelectedCategory: (_category: string | null) => void,

  user: User,
  intervals: UserInterval[],
  setUser: (_user: User) => void,
  setCategoryDisplayState: (_isDisplayed: boolean) => void,
  setStreakDisplay: (_isDisplayed: boolean) => void,
  setSoundActivation: (_isEnabled: boolean) => void,
  incrementUserStreak: () => void,
  resetUserStreak: () => void,
  updateInterval: (_id: ObjectId, _isEnabled: boolean) => void,
}

const userInitialValues: UserContextType = {} as UserContextType;

export const UserContext = createContext(userInitialValues);

type UserContextProviderProps = {
  children: ReactNode
}

export function UserContextProvider(
  { children }: UserContextProviderProps,
) {
  const [user, setUser] = useState<User>({} as User);
  const [isDraft, setDraftState] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');
  const [isInitialized, setInitializationState] = useState(false);
  const [intervals, setIntervals] = useState<UserInterval[]>(user.intervals || []);
  let isMounted = true;

  const userContextValue = useMemo(
    () => (
      {
        selectedCategory,
        setSelectedCategory,
        user,
        setUser,
        setCategoryDisplayState,
        setStreakDisplay,
        setSoundActivation,
        updateInterval,
        incrementUserStreak,
        resetUserStreak,
        intervals,
      }),
    [selectedCategory, user, intervals],
  );
  useEffect(onMount, []);
  useEffect(onUserUpdate, [user, intervals]);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );

  /**
   * Enable or disable sound for user
   * @param isEnabled
   */
  function setSoundActivation(isEnabled: boolean) {
    setDraftState(true);
    setUser({
      ...user,
      hasSoundEnabled: isEnabled,
    });
  }

  /**
   * Update the User's choice
   * @param _isDisplayed
   */
  function setCategoryDisplayState(_isDisplayed: boolean) {
    setDraftState(true);
    setUser({
      ...user,
      hasCategoriesDisplayed: _isDisplayed,
    });
  }

  /**
   * Update the User's choice
   * @param _isEnabled
   */
  function setStreakDisplay(_isEnabled: boolean) {
    setDraftState(true);
    setUser({
      ...user,
      hasStreakNotifications: _isEnabled,
    });
  }

  /**
   */
  /**
   * Update the interval of repetition
   * @param id The id of the interval to be updated
   * @param isEnabled The boolean value of the new interval
   */
  function updateInterval(id: ObjectId, isEnabled: boolean) {
    setDraftState(true);
    const updatedIntervals = intervals.map((interval) => (interval._id === id ? ({
      ...interval,
      isEnabled,
    }) : interval));
    setIntervals(updatedIntervals);
  }

  function onUserUpdate() {
    if (isMounted && isInitialized && isDraft) {
      setDraftState(false);
      updateUser();
    }

    return () => {
      isMounted = false;
    };
  }

  function onMount() {
    if (isMounted) {
      if (!isInitialized) {
        checkIfUserIsAuthed();
      }
    }

    return () => {
      isMounted = false;
    };
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
        setUser(response.data);
        setIntervals(response.data.intervals);
        setInitializationState(true);
      }).catch(handleError);
  }

  /**
   * Update the user in the server according to new data
   */
  function updateUser() {
    // Update user in DB here
    postOnServer('/users/connectedUser/preferences/update', {
      hasCategoriesDisplayed: user.hasCategoriesDisplayed,
      hasStreakNotifications: user.hasStreakNotifications,
      hasSoundEnabled: user.hasSoundEnabled,
      intervals,
    })
      .then(() => {
        addNotification(userPreferencesSavedNotification);
      });
  }

  /**
   * Increment the user's streak
   */
  function incrementUserStreak() {
    setUser({
      ...user,
      sessionStreak: user.sessionStreak + 1,
    });
  }

  function resetUserStreak() {
    setUser({
      ...user,
      sessionStreak: 0,
    });
  }
}
