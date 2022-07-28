import { FC, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthCtxValue } from '../contexts/auth/auth.context';
import { AuthActionType } from '../contexts/auth/auth.types';
import { Loader } from './Loader';

interface RequireAuthProps {
  c: FC;
}
interface LocationState {
  token?: string;
}

const RequireAuth: FC<RequireAuthProps> = ({ c: C }) => {
  const [{ isAuthenticated }, dispatch] = useAuthCtxValue();
  const location = useLocation();
  const effectRef = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (effectRef.current === 0) {
      if (!isAuthenticated) {
        const token = (location.state as LocationState)?.token;
        if (token) {
          fetch('http://localhost:4242/api/auth/session', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (response) {
                dispatch({
                  type: AuthActionType.SET_AUTH_USER,
                  payload: response,
                });
              } else {
                navigate('/login', {
                  state: {
                    token: null,
                    replace: true,
                  },
                });
              }
            });
        } else {
          navigate('/login', {
            state: {
              token: null,
              replace: true,
            },
          });
        }
      }

      effectRef.current++;
    }
  }, []);

  return isAuthenticated ? <C /> : <Loader />;
};

export { RequireAuth };
