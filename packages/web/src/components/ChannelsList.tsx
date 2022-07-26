import { FC, useCallback, useEffect, useRef } from 'react';
import { Flex, Avatar, Text, Box, Center } from '@chakra-ui/react';
import { useInboxCtxValue } from '../contexts/inbox.context';
import { ActionType } from '../contexts/inbox.types';
import { io } from '../lib/io.instance';

const ChannelsList: FC = () => {
  const [{ inbox }, dispatch] = useInboxCtxValue();

  const effectRef = useRef(0);

  useEffect(() => {
    if (effectRef.current === 0) {
      io.emit('@fetch:users');

      io.on('@users:fetched', (users) => {
        dispatch({
          type: ActionType.SET_INBOX,
          payload: users,
        });
      });
      effectRef.current++;
    }
  }, []);

  const handleSelectUserId = useCallback(
    (id: number) => () => {
      dispatch({ type: ActionType.SELECT_USER_ID, payload: { id } });
    },
    []
  );

  return (
    <Flex direction="column" width="100%">
      {inbox.length ? (
        inbox.map((user) => (
          <Flex
            onClick={handleSelectUserId(user.id)}
            key={user.id}
            direction="row"
            alignItems="center"
            width="100%"
            px="4"
            py="3"
            my="2"
            cursor="pointer"
            borderColor="gray.50"
            borderBottom="1px solid"
            _hover={{
              borderBottom: '0px solid',
              borderRadius: 'lg',
              bgColor: 'gray.900',
            }}
          >
            <Avatar size="md" name={user.username} src={user.avatar} />
            <Box ml="4">
              <Text>{user.username}</Text>
            </Box>
          </Flex>
        ))
      ) : (
        <Center my="5">
          <Text fontStyle="italic">No users</Text>
        </Center>
      )}
    </Flex>
  );
};

export { ChannelsList };
