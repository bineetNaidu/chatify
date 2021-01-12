import { createContext, useContext, useReducer, FC } from 'react';
import reducer, { initialState } from './reducer';

//? Prepares the dataLayer
export const StateContext = createContext<any>([]);

//? Wrap our app and provide the Data layer
export const StateProvider: FC = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

//? Pull information from the data layer
export const useContextStateValue = () => useContext(StateContext);
