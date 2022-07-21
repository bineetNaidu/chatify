import {
  Flex,
  Box,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
      <ButtonGroup gap="2">
        <Link to="/register">
          <Button colorScheme="teal">Register</Button>
        </Link>
        <Link to="/login">
          <Button colorScheme="teal">Log in</Button>
        </Link>
      </ButtonGroup>
    </Flex>
  );
};

export default Navbar;
