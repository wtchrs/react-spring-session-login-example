import {Dispatch, useEffect, useState} from 'react';
import {NavigateFunction} from 'react-router-dom';
import apiClient from '../services/api-client.ts';

export interface UserAuthRequest {
  id: string;
  password: string;
  remember: boolean;
}

export interface UserAuthResponse {
  success: boolean;
  userInfo?: UserInfo;
  errorMsg?: string;
}

export interface UserInfo {
  id: string;
  name: string;
}

const useUser = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get<UserAuthResponse>('/user/auth')
      .then(({data}) => {
        if (data.success) {
          setUserInfo(data.userInfo as UserInfo);
        }
      });
  }, []);

  const handleSignIn = (req: UserAuthRequest, setLoading: Dispatch<boolean>, navigate: NavigateFunction) => {
    apiClient.post<UserAuthResponse>('/user/auth', req)
      .then(({data}) => {
        if (data.success) {
          setUserInfo(data.userInfo as UserInfo);
          navigate('/');
        } else {
          setUserInfo(null);
          setError(data.errorMsg as string);
        }
        setLoading(false);
      })
      .catch(err => {
        setUserInfo(null);
        setError(err.message);
        setLoading(false);
      });
  };

  const handleLogout = () => {
    apiClient.post('/user/auth/logout')
      .then(() => {
        setUserInfo(null)
        setError('')
      })
  };

  return {userInfo, error, handleSignIn, handleLogout};
};

export default useUser;
