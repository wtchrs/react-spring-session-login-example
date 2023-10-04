import {Button, HStack, Link} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {UserInfo} from '../hooks/useUser.ts';

interface Props {
  userInfo: UserInfo | null;
  handleLogout: () => void;
}

const UserNav = ({userInfo, handleLogout}: Props) => {
  const navigate = useNavigate();

  if (!userInfo) {
    return (
      <HStack>
        <Button onClick={() => navigate('/sign-up')}>Sign Up</Button>
        <Button onClick={() => navigate('/sign-in')}>Sign In</Button>
      </HStack>
    );
  }

  return (
    <HStack>
      <Link href="#">{`Hello, ${userInfo.name}!`}</Link>
      <Button onClick={handleLogout}>Sign Out</Button>
    </HStack>
  );
};

export default UserNav;
