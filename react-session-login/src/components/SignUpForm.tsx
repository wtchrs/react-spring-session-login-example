import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading, HStack,
  Input,
  Link,
  Stack, Text,
} from '@chakra-ui/react';
import {FormEvent} from 'react';
import {useNavigate} from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: implement handleSubmit.
  };

  return (
    <Card minW={400}>
      <CardHeader>
        <Heading>Sign Up</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="id">
              <FormLabel>ID</FormLabel>
              <Input type="text"/>
            </FormControl>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text"/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password"/>
            </FormControl>
            <Button type="submit">Sign up</Button>
          </Stack>
          <HStack marginTop={4} align="center" justify="center">
            <Text>Already a user?</Text>
            <Link onClick={() => navigate('/sign-in')}>Sign in</Link>
          </HStack>
        </form>
      </CardBody>
    </Card>
  );
};

export default SignUpForm;
