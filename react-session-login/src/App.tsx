import {Flex, Stack} from '@chakra-ui/react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from './components/Home.tsx';
import SignInForm from './components/SignInForm.tsx';
import NavBar from './components/NavBar.tsx';
import SignUpForm from './components/SignUpForm.tsx';
import useUser from './hooks/useUser.ts';

function App() {
  const {userInfo, error, handleSignIn, handleLogout} = useUser();

  return (
    <BrowserRouter>
      <Stack height="100vh" width="100vw">
        <NavBar userInfo={userInfo} handleLogout={handleLogout}/>
        <Flex height="100%" width="100%" align="center" justify="center">
          <Flex width="100%" align="center" justify="center">
            <Routes>

              <Route path="/" element={
                <Home userInfo={userInfo}/>
              }/>

              <Route path="/sign-in" element={
                <>
                  {userInfo && <Navigate to="/"/>}
                  <SignInForm error={error} handleSignIn={handleSignIn}/>
                </>
              }/>

              <Route path="/sign-up" element={
                <SignUpForm/>
              }/>

            </Routes>
          </Flex>
        </Flex>
      </Stack>
    </BrowserRouter>
  );
}

export default App;
