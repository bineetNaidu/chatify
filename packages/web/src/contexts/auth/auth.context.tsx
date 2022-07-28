import {
  createContext,
  useContext,
  useReducer,
  FC,
  ReactNode,
  Dispatch,
} from 'react';
import { authReducer, initialAuthState } from './auth.reducer';
import { IAuthState, IAuthAction } from './auth.types';

// Prepares the dataLayer
export const AuthContext = createContext<[IAuthState, Dispatch<IAuthAction>]>([
  initialAuthState,
  () => {},
]);

interface AuthProviderProps {
  children: ReactNode;
}

// Wrap our app and provide the Data layer
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

// Pull information from the data layer
export const useAuthCtxValue = () => useContext(AuthContext);
