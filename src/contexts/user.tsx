/**
 * This file has to contain every user value
 * and possible methods to change it
 */
import React, {
  createContext, ReactNode, useMemo, useState,
} from 'react';

type UserContextType = {
  selectedCategory: string | null,
  // @ts-ignore
  setSelectedCategory: (_category: string | null) => void
}

const userInitialValues: UserContextType = {} as UserContextType;

export const UserContext = createContext(userInitialValues);

type UserContextProviderProps = {
  children: ReactNode
}

export function UserContextProvider(
  { children }: UserContextProviderProps,
) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('');

  const userContextValue = useMemo(
    () => (
      { selectedCategory, setSelectedCategory }),
    [selectedCategory],
  );

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}
