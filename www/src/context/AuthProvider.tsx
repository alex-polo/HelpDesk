import { createContext, useEffect, useState } from 'react';
import {
  IUserAccessToken,
  IUserProfile,
  IUserLoginData,
  getProfileAPI,
  loginAPI,
  logoutAPI,
} from '../services/AuthService';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppRoutes } from '../routes/AppRoutes';
import { UserProfile } from './AuthProvider.types';
import axiosInstance from '../api/AxiosInstance';

type Props = { children: React.ReactNode };

type UserContextType = {
  logout: () => void;
  isLoggedIn: () => boolean;
  loginUser: (loginUserData: IUserLoginData) => Promise<void>;
  getUserProfile: () => Promise<IUserProfile>;
};

const AuthContext = createContext<UserContextType>({} as UserContextType);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const userProfileLocalStorage = localStorage.getItem('userProfile');

    if (userProfileLocalStorage) {
      const profile: UserProfile = JSON.parse(userProfileLocalStorage);
      setUserProfile(profile);
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${profile.access_token}`;
    }

    setIsReady(true);
  }, []);

  const isLoggedIn = (): boolean => {
    return userProfile != null ? true : false;
  };

  const loginUser = async (loginUserData: IUserLoginData): Promise<void> => {
    unauthorized();
    try {
      const data: IUserAccessToken = (await loginAPI(loginUserData.email, loginUserData.password)).data;
      const profile: UserProfile = { email: loginUserData.email, access_token: data.access_token };
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setUserProfile(profile);
      navigate(AppRoutes.USER_PROFILE.home);
    } catch (error) {
      unauthorized();
      throw new Error('getUserProfileInfoAPI response was not ok');
    }
  };

  const getUserProfile = async (): Promise<IUserProfile> => {
    if (userProfile != null) {
      try {
        return (await getProfileAPI()).data;
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
      logoutAPI();
    }
    unauthorized();
  };

  const unauthorized = () => {
    localStorage.removeItem('userProfile');
    setUserProfile(null);
    navigate(AppRoutes.AUTH.login);
  };

  // const getToken = (): string => {
  //   const valueProfile = localStorage.getItem('userProfile');
  //   if (valueProfile != null) {
  //     return JSON.parse(valueProfile).access_token;
  //   } else {
  //     unauthorized();
  //     return '';
  //   }
  // };

  return (
    <AuthContext.Provider value={{ loginUser, logout, isLoggedIn, getUserProfile }}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
