import { Switch, Redirect, Route, useHistory } from 'react-router-dom';
import io from './socketio';
import { useUserStateValue } from './data/UserStateProvider';
import { RoomStateProvider } from './data/RoomStateProvider';
import Home from './pages/Home';
import UserOnBoardPage from './pages/User';
import { ActionTypes, UserType } from './types';

function App() {
  const [state, dispatch] = useUserStateValue();
  const history = useHistory();

  io.on('USER_ACTIVE', (user: UserType) => {
    //! Check for user id match
    dispatch({
      type: ActionTypes.SetUser,
      payload: user,
    });
    history.push('/user');
  });

  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        {state.user !== null ? (
          <RoomStateProvider>
            <Route exact path="/user" component={UserOnBoardPage} />
          </RoomStateProvider>
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
    </>
  );
}

export default App;
