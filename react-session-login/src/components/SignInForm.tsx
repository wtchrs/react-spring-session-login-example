import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox, CircularProgress,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
} from '@chakra-ui/react';
import {Dispatch, FormEvent, useRef, useState} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {UserAuthRequest} from '../hooks/useUser.ts';

interface Props {
  handleSignIn: (req: UserAuthRequest, setLoading: Dispatch<boolean>, navigate: NavigateFunction) => void;
  error: string;
}

const SignInForm = ({handleSignIn, error}: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [formError, setFormError] = useState('');

  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleRememberChange = () => setChecked(!isChecked);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!idRef.current?.value) {
      setFormError('ID required.');
      return;
    }
    if (!passwordRef.current?.value) {
      setFormError('Password required.');
      return;
    }

    setFormError('');
    setLoading(true);

    const req = {
      id: idRef.current.value,
      password: passwordRef.current.value,
      remember: isChecked,
    };

    handleSignIn(req, setLoading, navigate);
  };

  return (
    <Card minW={400}>
      <CardHeader>
        <Heading>Sign In</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {
              error &&
              <Alert status="error">
                <AlertIcon/>
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            }
            {
              formError &&
              <Alert status="error">
                <AlertIcon/>
                <AlertTitle>{formError}</AlertTitle>
              </Alert>
            }
            <FormControl id="id">
              <FormLabel>ID</FormLabel>
              <Input ref={idRef} type="text"/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input ref={passwordRef} type="password"/>
            </FormControl>
            <Stack spacing={10}>
              <Stack direction={{base: 'column', sm: 'row'}} align={'start'} justify={'space-between'}>
                <Checkbox onChange={handleRememberChange}>Remember me</Checkbox>
                <Link href="#">Forgot password?</Link>
              </Stack>
              {
                !isLoading
                  ? <Button type="submit">Sign in</Button>
                  : <CircularProgress isIndeterminate/>
              }
            </Stack>
          </Stack>
        </form>
      </CardBody>
    </Card>
  );
};

export default SignInForm;
