import { FC } from 'react';
import {
  Flex,
  Avatar,
  Text,
  Box,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useChannelCtxValue } from '../contexts/channels.context';
import { AddChannelModal } from './AddChannelModal';

const ChannelsList: FC = () => {
  const [state] = useChannelCtxValue();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex direction="column" width="100%">
      <AddChannelModal isOpen={isOpen} onClose={onClose} />
      <Button my="2" onClick={onOpen}>
        <Text>Create Channel</Text>
      </Button>
      {state.channels.map((channel) => (
        <Flex
          key={channel.id}
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
          <Avatar size="md" name={channel.name} src={channel.avatar} />
          <Box ml="4">
            <Text>{channel.name}</Text>
            <Text fontStyle="italic" fontSize="sm" textColor="gray.500">
              {channel.messages[channel.messages.length - 1]?.body ??
                'Start chatting!'}
            </Text>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};

export { ChannelsList };
