import {Button, Text} from '@chakra-ui/react';
import {useState} from 'react';
import {UserInfo} from '../hooks/useUser.ts';
import apiClient from '../services/api-client.ts';

interface TestApiResult {
  success: boolean;
  message: string;
}

interface Props {
  userInfo: UserInfo | null;
}

const Home = ({userInfo}: Props) => {
  const [result, setResult] = useState('');

  const handleClick = () => {
    apiClient.get<TestApiResult>('/test')
      .then(({data}) => {
        if (data.success) {
          setResult('Test success: ' + data.message);
        } else {
          setResult('Test failed: ' + data.message);
        }
      })
      .catch(err => {
        setResult('Test Failed: ' + err.message)
      });
  };

  if (!userInfo) {
    return (
      <Text>Guest user</Text>
    );
  }

  return (
    <>
      <Text>{`User: ${userInfo.id}`}</Text>
      <Text>{`Name: ${userInfo.name}`}</Text>
      <Button onClick={handleClick}>Test API</Button>
      {result && <Text>{result}</Text>}
    </>
  );
};

export default Home;
