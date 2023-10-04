import {Image, HStack, useColorModeValue} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {UserInfo} from '../hooks/useUser.ts';
import logo from '../assets/react.svg';
import UserNav from './UserNav.tsx';

interface Props {
  userInfo: UserInfo | null;
  handleLogout: () => void;
}

const NavBar = ({userInfo, handleLogout}: Props) => {
  const navigate = useNavigate();

  return (
    <HStack justify="space-between" padding="10px" borderBottom={1} borderStyle="solid"
            borderColor={useColorModeValue('gray.200', 'gray.600')}>
      <Image boxSize="60px" src={logo} alt="logo" onClick={() => navigate('/')}/>
      <UserNav userInfo={userInfo} handleLogout={handleLogout}/>
    </HStack>
  );
};

export default NavBar;
