import { Switch, Redirect, Route } from 'react-router-dom';
import io from './socketio';
import { useStateValue } from './data/StateProvider';
import Home from './pages/Home';
import UserOnBoardPage from './pages/User';
import { ActionTypes, User } from './types';

function App() {
  const [state, dispatch] = useStateValue();
  io.on('USER_ACTIVE', (user: User) => {
    dispatch({
      type: ActionTypes.SetOnline,
      payload: { online: user.online },
    });
  });

  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        {state.user ? (
          <Route exact path="/u" component={UserOnBoardPage} />
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
    </>
  );
}

export default App;
