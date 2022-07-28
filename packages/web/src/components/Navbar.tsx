import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { Location, useNavigate } from 'react-router-dom';
import { useAuthCtxValue } from '../contexts/auth/auth.context';
import { AuthActionType } from '../contexts/auth/auth.types';
import { io } from '../lib/io.instance';

const Navbar = () => {
  const [{ authUser }, dispatch] = useAuthCtxValue();
  const navigate = useNavigate();
  const effectRef = useRef(0);

  useEffect(() => {
    if (authUser && effectRef.current === 0) {
      io.emit('@join', authUser);
      effectRef.current++;
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('chatify:token');
    dispatch({
      type: AuthActionType.RESET,
    });
    navigate('/login', { state: { token: null } });
  };

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
          <Avatar size="sm" name={authUser?.username} src={authUser?.avatar} />
          <Text ml="1">{authUser?.username}</Text>
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
