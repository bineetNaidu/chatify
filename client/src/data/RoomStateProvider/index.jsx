import { createContext, useContext, useReducer } from 'react';
import reducer, { initialRoomState } from './reducer';

// Prepares the dataLayer
export const RoomStateContext = createContext();

// Wrap our app and provide the Data layer
export const RoomStateProvider = ({ children }) => (
  <RoomStateContext.Provider value={useReducer(reducer, initialRoomState)}>
    {children}
  </RoomStateContext.Provider>
);

// Pull information from the data layer
export const useRoomStateValue = () => useContext(RoomStateContext);
