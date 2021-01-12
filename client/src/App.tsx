import { Switch, Redirect, Route } from 'react-router-dom';
import { io as socketIO } from 'socket.io-client';
import Home from './pages/Home';
import UserOnBoardPage from './pages/User';

const io = socketIO();

function App() {
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
