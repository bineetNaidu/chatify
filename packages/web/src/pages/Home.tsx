import Navbar from '../components/Navbar';
import { Grid, Box, GridItem } from '@chakra-ui/react';
import { ChannelsList } from '../components/ChannelsList';
import { ChannelProvider } from '../contexts/channels.context';

const Home = () => {
  return (
    <ChannelProvider>
      <Box minH={'100vh'} h="100%" p="4">
        <Navbar />

        <Grid templateColumns="repeat(4, 1fr)">
          <GridItem>
            <ChannelsList />
          </GridItem>
          <GridItem colSpan={3} bgColor="green.600" h="lg">
            {/* Chat Window  */}
          </GridItem>
        </Grid>
      </Box>
    </ChannelProvider>
  );
};

export default Home;
