import { Switch, Redirect, Route } from 'react-router-dom';
import { io as socketIO } from 'socket.io-client';
import Home from './pages/Home';

const io = socketIO();

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
