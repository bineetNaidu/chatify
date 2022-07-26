import {
  createContext,
  useContext,
  useReducer,
  FC,
  ReactNode,
  Dispatch,
} from 'react';
import { inboxReducer, initialState } from './inbox.reducer';
import { IAction, IState } from './inbox.types';

// Prepares the dataLayer
export const InboxContext = createContext<[IState, Dispatch<IAction>]>([
  initialState,
  () => {},
]);

interface InboxProviderProps {
  children: ReactNode;
}

// Wrap our app and provide the Data layer
export const InboxProvider: FC<InboxProviderProps> = ({ children }) => {
  return (
    <InboxContext.Provider value={useReducer(inboxReducer, initialState)}>
      {children}
    </InboxContext.Provider>
  );
};

// Pull information from the data layer
export const useInboxCtxValue = () => useContext(InboxContext);
