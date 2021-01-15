import { Switch, Redirect, Route } from 'react-router-dom';
import io from './socketio';
import { useStateValue } from './data/StateProvider';
import Home from './pages/Home';
import UserOnBoardPage from './pages/User';
import { ActionTypes, User, Server } from './types';

function App() {
  const [state, dispatch] = useStateValue();

  io.on('USER_ACTIVE', (user: User) => {
    dispatch({
      type: ActionTypes.SetUser,
      payload: user,
    });

    dispatch({
      type: ActionTypes.SetOnline,
      payload: { online: user.online },
    });
  });

  io.on('SERVER_RETRIVED', (server: Server) => {
    const { serverAdmin, channels, serverName, visibility, members } = server;
    dispatch({
      type: ActionTypes.SetServer,
      payload: { serverAdmin, serverName, visibility, members },
    });

    dispatch({
      type: ActionTypes.SetChannel,
      payload: channels,
    });
  });

  const handleSignin = () => {
    io.emit('USER_ACTIVE', { id: '5ffb347148bc245492cd0441', online: true });
  };

  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/google"
          render={() => (
            <div>
              <button onClick={handleSignin}>Signin</button>
            </div>
          )}
        />
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
