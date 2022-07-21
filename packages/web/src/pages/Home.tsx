import { Grid, Box } from '@chakra-ui/react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <Box minH={'100vh'} h="100%" p="4">
      <Navbar />
      <Grid>
        <h1>Home</h1>
      </Grid>
    </Box>
  );
};

export default Home;
