import { Switch, Redirect, Route } from 'react-router-dom';
import { io as socketIO } from 'socket.io-client';
import { useContextStateValue } from './data/StateProvider';
import Home from './pages/Home';
import UserOnBoardPage from './pages/User';

const io = socketIO();

function App() {
  const [state, dispatch] = useContextStateValue();
  console.log(state.online);
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
