/**
 * This file has to contain every user value
 * and possible methods to change it
 */
import React, {
  createContext, ReactNode, useMemo, useState,
} from 'react';
import User from "../types/User";

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
  { children }: UserContextProviderProps,
) {
  const [user, setUser] = useState<User>({} as User)
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');

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
    setUser({
      ...user,
      hasCategoriesDisplayed: _isDisplayed,
    })
  }
}
