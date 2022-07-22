import {
  createContext,
  useContext,
  useReducer,
  FC,
  ReactNode,
  Dispatch,
} from 'react';
import { channelReducer, initialState } from './channels.reducer';
import { IAction, IState } from './channels.types';

// Prepares the dataLayer
export const ChannelContext = createContext<[IState, Dispatch<IAction>]>([
  initialState,
  () => {},
]);

interface ChannelProviderProps {
  children: ReactNode;
}

// Wrap our app and provide the Data layer
export const ChannelProvider: FC<ChannelProviderProps> = ({ children }) => {
  return (
    <ChannelContext.Provider value={useReducer(channelReducer, initialState)}>
      {children}
    </ChannelContext.Provider>
  );
};

// Pull information from the data layer
export const useChannelCtxValue = () => useContext(ChannelContext);
