import React, { createContext, useContext, useReducer } from 'react';
import reducer, { intialUserState } from './reducer';

// Prepares the dataLayer
export const UserStateContext = createContext();

// Wrap our app and provide the Data layer
export const UserStateProvider = ({ children }) => (
  <UserStateContext.Provider value={useReducer(reducer, intialUserState)}>
    {children}
  </UserStateContext.Provider>
);

// Pull information from the data layer
export const useUserStateValue = () => useContext(UserStateContext);
