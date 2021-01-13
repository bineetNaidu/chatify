import { Switch, Redirect, Route } from 'react-router-dom';
import io from './socketio';
import { useContextStateValue } from './data/StateProvider';
import Home from './pages/Home';
import UserOnBoardPage from './pages/User';
import { ActionTypes, User } from './types';

function App() {
  const [state, dispatch] = useContextStateValue();
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
        <Route exact path="/u" component={UserOnBoardPage} />
      </Switch>
    </>
  );
}

export default App;
