import { FC } from 'react';
import './home.scss';

const Home: FC = () => {
  const handleSignWithGoogle = () => {
    window.open('https://localhost:4242/api/auth/google');
  };

  return (
    <div className="home">
      <h1 className="home__welcome__text">Welcome to Chatify</h1>
      <button className="home__signupBtn" onClick={handleSignWithGoogle}>
        Sign up!
      </button>
    </div>
  );
};

export default Home;
