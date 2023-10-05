import {Button, HStack, Input, List, ListItem, Stack, Text} from '@chakra-ui/react';
import {FormEvent, useRef, useState} from 'react';
import {UserInfo} from '../hooks/useUser.ts';
import apiClient from '../services/api-client.ts';

type TestApiResult = TestApiSuccessResult | TestApiFailResult;

interface TestApiSuccessResult {
  success: true;
  message: string;
}

interface TestApiFailResult {
  success: false;
  errorMsg: string;
}

interface Props {
  userInfo: UserInfo | null;
}

const Home = ({userInfo}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<string[]>([]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    apiClient.post<TestApiResult>('/test', {message: inputRef.current?.value || ''})
      .then(({data}) => {
        if (data.success) {
          setResults([...results, 'Test success: ' + data.message]);
        } else {
          setResults([...results, 'Test failed: ' + data.errorMsg]);
        }
      })
      .catch(err => {
        setResults([...results, 'Test Failed: ' + err.message]);
      });
  };

  if (!userInfo) {
    return (
      <Text>Guest user</Text>
    );
  }

  return (
    <Stack align="center">
      <Text>{`User ID: ${userInfo.id}`}</Text>
      <Text>{`Name: ${userInfo.name}`}</Text>
      <form onSubmit={handleSubmit}>
        <HStack>
          <Input ref={inputRef} type="text" name="message"/>
          <Button type="submit">Test API</Button>
        </HStack>
      </form>
      <List>
        {results.map((result, index) => <ListItem key={index}>{result}</ListItem>)}
      </List>
    </Stack>
  );
};

export default Home;
