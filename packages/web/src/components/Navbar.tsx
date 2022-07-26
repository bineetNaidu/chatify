import { useEffect, useRef } from 'react';
import {
  Flex,
  Box,
  Heading,
  Spacer,
  Avatar,
  Text,
  Button,
} from '@chakra-ui/react';
import { Navigate, useLocation, Location, useNavigate } from 'react-router-dom';
import { UserType } from '@chatify/types';
import { io } from '../lib/io.instance';

type LocationType = Location & {
  state: {
    authUser: UserType | null;
  };
};

const Navbar = () => {
  const location = useLocation() as LocationType;
  const navigate = useNavigate();
  const effectRef = useRef(0);

  useEffect(() => {
    if (location.state.authUser && effectRef.current === 0) {
      io.emit('@join', location.state.authUser);
      effectRef.current++;
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('chatify:token');
    navigate('/login', { state: { authUser: null } });
  };

  if (!location.state?.authUser) {
    return <Navigate to="/login" replace state={{ authUser: null }} />;
  }
  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      gap="2"
      as="nav"
      mb="2"
      pb="4"
      borderBottom={'1px'}
    >
      <Box>
        <Heading size="2xl" fontStyle="italic">
          Chatify
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <Button size="lg" onClick={handleSignOut}>
          <Avatar
            size="sm"
            name={location.state.authUser.username}
            src={location.state.authUser.avatar}
          />
          <Text ml="1">{location.state.authUser.username}</Text>
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
