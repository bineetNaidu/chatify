import Navbar from '../components/Navbar';
import { Grid, Box, GridItem } from '@chakra-ui/react';
import { ChannelsList } from '../components/ChannelsList';
import { InboxProvider } from '../contexts/inbox/inbox.context';
import { ChatWindow } from '../components/ChatWindow';

const Home = () => {
  return (
    <InboxProvider>
      <Box minH={'100vh'} h="100%" p="4">
        <Navbar />

        <Grid templateColumns="repeat(4, 1fr)">
          <GridItem borderRight="1px solid">
            <ChannelsList />
          </GridItem>
          <GridItem colSpan={3} h="lg" px="10">
            <ChatWindow />
          </GridItem>
        </Grid>
      </Box>
    </InboxProvider>
  );
};

export default Home;
