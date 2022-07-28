import { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Formik, Form } from 'formik';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuthCtxValue } from '../contexts/auth/auth.context';
import { AuthActionType } from '../contexts/auth/auth.types';

const Login = () => {
  const [, dispatch] = useAuthCtxValue();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Login
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values) => {
            const response = await fetch(
              'http://localhost:4242/api/auth/login',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              }
            );
            const data = await response.json();
            if (response.ok && response.status === 200) {
              localStorage.setItem('chatify:token', data.token);
              dispatch({
                type: AuthActionType.SET_AUTH_USER,
                payload: data.user,
              });
              toast({
                title: 'Success',
                description: 'You have successfully Logged You in!',
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
              navigate('/', {
                state: {
                  token: data.token,
                },
              });
            } else {
              if (data.message) {
                toast({
                  title: data.message,
                  status: 'error',
                  duration: 2000,
                  isClosable: true,
                });
              }
              if (data.error) {
                data.error.forEach((error: any) => {
                  toast({
                    title: error.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                  });
                });
              }
            }
          }}
        >
          {({ isSubmitting, getFieldProps }) => (
            <Form>
              <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}
              >
                <Stack spacing={4}>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" {...getFieldProps('email')} />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        {...getFieldProps('password')}
                      />
                      <InputRightElement h={'full'}>
                        <Button
                          type="button"
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                      size="lg"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      type="submit"
                    >
                      login
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={'center'}>
                      Not a user?
                      <RouterLink to="/register">
                        <Link color={'blue.400'} pl="1">
                          Register
                        </Link>
                      </RouterLink>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
};

export default Login;
