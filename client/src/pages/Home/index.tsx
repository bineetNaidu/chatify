import { FC } from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import './home.scss';
import io from '../../socketio';

const Home: FC = () => {
  const responseGoogle = async (googleData: any) => {
    const { data } = await axios.post('/api/auth/google', {
      googleId: googleData.googleId,
      name: googleData.profileObj.name,
      avatar: googleData.profileObj.imageUrl,
    });

    io.emit('USER_ACTIVE', { id: data.id });
  };

  return (
    <div className="home">
      <h1 className="home__welcome__text">Welcome to Chatify</h1>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_KEY!}
        buttonText="Login With Google"
        onSuccess={responseGoogle}
        onFailure={(err) => {
          alert(err.error);
          console.log(err);
        }}
        // cookiePolicy={'single_host_origin'}
        // isSignedIn
        icon
      />
    </div>
  );
};

export default Home;
