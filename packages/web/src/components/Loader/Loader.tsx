import './loader.css';
import { FC } from 'react';
import { Flex } from '@chakra-ui/react';

const Loader: FC = () => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minH="full"
      h="full"
      pt="40"
    >
      <div className="loader"></div>
    </Flex>
  );
};

export { Loader };
