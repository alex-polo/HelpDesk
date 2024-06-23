import { createContext, useEffect, useState } from 'react';
import { getUserProfileInfoAPI, loginAPI, logoutAPI } from '../services/AuthService';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../routes/AppRoutes';
import axios from 'axios';

type Props = { children: React.ReactNode };

type UserContextType = {
  logout: () => void;
  isLoggedIn: () => boolean;
  loginUser: (loginUserData: UserLoginData) => Promise<void>;
  getUserInfo: () => Promise<UserInfo>;
  unauthorized: () => void;
  getToken: () => string;
};

const AuthContext = createContext<UserContextType>({} as UserContextType);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const userProfileLocalStorage = localStorage.getItem('userProfile');

    if (userProfileLocalStorage) {
      setUserProfile(JSON.parse(userProfileLocalStorage));
    }

    setIsReady(true);
  }, []);

  const isLoggedIn = (): boolean => {
    return userProfile != null ? true : false;
  };

  const loginUser = async (loginUserData: UserLoginData): Promise<void> => {
    unauthorized();
    try {
      const data: UserAccessToken = (await loginAPI(loginUserData.email, loginUserData.password)).data;
      const profile: UserProfile = { email: loginUserData.email, access_token: data.access_token };
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setUserProfile(profile);
      navigate(AppRoutes.USER_PROFILE.home);
    } catch (error) {
      unauthorized();
      throw new Error('getUserProfileInfoAPI response was not ok');
    }
  };

  const getUserInfo = async (): Promise<UserInfo> => {
    if (userProfile != null) {
      try {
        return (await getUserProfileInfoAPI(userProfile?.access_token)).data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status == 401) {
            unauthorized();
          }
        } else {
          console.log(error);
        }
      }
    }

    throw new Error('getUserProfileInfoAPI response was not ok');
  };

  const logout = () => {
    if (userProfile != null) {
      logoutAPI(userProfile.access_token);
    }
    unauthorized();
  };

  const unauthorized = () => {
    localStorage.removeItem('userProfile');
    setUserProfile(null);
    // navigate(AppRoutes.AUTH.login);
  };

  const getToken = (): string => {
    const valueProfile = localStorage.getItem('userProfile');
    if (valueProfile != null) {
      return JSON.parse(valueProfile).access_token;
    } else {
      unauthorized();
      return '';
    }
    // if (userProfile == null) {
    //   const valueProfile = localStorage.getItem('userProfile');
    //   if (valueProfile != null) {
    //     return JSON.parse(valueProfile).access_token;
    //   } else {
    //     unauthorized();
    //     return '';
    //   }
    // } else {
    //   return userProfile.access_token;
    // }
  };

  return (
    <AuthContext.Provider value={{ getToken, loginUser, logout, isLoggedIn, unauthorized, getUserInfo }}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
