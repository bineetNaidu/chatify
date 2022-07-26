import { FC, useState, useRef, useCallback, useEffect } from 'react';
import {
  Box,
  Flex,
  Input,
  Text,
  Avatar,
  Center,
  Button,
} from '@chakra-ui/react';
import type { ChatType, UserType } from '@chatify/types';
import { useInboxCtxValue } from '../contexts/inbox.context';
import { io } from '../lib/io.instance';
import { formatDistance, subDays } from 'date-fns';

const ChatWindow: FC = () => {
  const effectRef = useRef(0);
  const [text, setText] = useState('');
  const [chats, setChats] = useState<ChatType[]>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const [{ selectedUserId }] = useInboxCtxValue();

  useEffect(() => {
    if (selectedUserId) io.emit('@fetch:user', selectedUserId);
  }, [selectedUserId]);

  useEffect(() => {
    if (effectRef.current === 0) {
      io.on('@user:fetched', (user, chatsData) => {
        setUser(user);
        setChats(chatsData);
      });

      io.on('@chat:sent', (data) => {
        setChats((prev) => [...prev, data]);
      });
      effectRef.current++;
    }
  }, []);

  const handleSendMsg = useCallback(
    (e: any) => {
      e.preventDefault();
      if (text.trim().length > 0 && user) {
        io.emit('@send:chat', { message: text, toUserId: user.id });
        setText('');
      }
    },
    [text]
  );

  if (!user) {
    return <Center>Select to chat</Center>;
  }
  return (
    <Flex flexDirection="column" h="100%" borderLeft="1px dashed">
      <Center borderBottom="1px dashed" pb="5">
        <Flex alignItems="center">
          <Avatar size="md" src={user.avatar} name={user.username} />
          <Text>{user.username}</Text>
        </Flex>
      </Center>
      <Flex flexDirection="column" flex="1" px="4" my="4" overflowX="auto">
        {chats.map((chat) => (
          <Box
            key={chat.id}
            px="3"
            py="2"
            my="1"
            bgColor={chat.fromUserId === user.id ? 'gray.700' : 'gray.900'}
            w="max-content"
            rounded="xl"
            alignSelf={chat.fromUserId === user.id ? 'flex-start' : 'flex-end'}
            position="relative"
          >
            {chat.fromUserId === user.id ? (
              <Flex alignItems="center">
                <Avatar size="sm" src={user.avatar} name={user.username} />
                <Text ml="3">{chat.message}</Text>
              </Flex>
            ) : (
              <Text textAlign="right">{chat.message}</Text>
            )}
            <Text fontSize="10px" fontStyle="italic">
              ~{' '}
              {formatDistance(
                subDays(new Date(chat.createdAt), 0),
                new Date(),
                {
                  addSuffix: true,
                }
              )}
            </Text>
          </Box>
        ))}
      </Flex>
      <Box px="4" as="form" onSubmit={handleSendMsg}>
        <Input
          w="full"
          value={text}
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" onClick={handleSendMsg} hidden>
          send
        </Button>
      </Box>
    </Flex>
  );
};

export { ChatWindow };
