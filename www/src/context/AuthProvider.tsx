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
  loginUser: (email: string, password: string) => Promise<boolean>;
  // userProfile: UserProfile | null;
  getUserInfo: () => Promise<UserInfo>;
  unauthorized: () => void;
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

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    unauthorized();
    const data: UserAccessToken | undefined = (await loginAPI(email, password)).data;
    if (data == undefined) {
      return false;
    } else {
      const profile: UserProfile = { email: email, access_token: data.access_token };
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setUserProfile(profile);
      navigate(AppRoutes.USER_PROFILE.home);
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
    navigate(AppRoutes.AUTH.login);
  };

  return (
    <AuthContext.Provider value={{ loginUser, logout, isLoggedIn, unauthorized, getUserInfo }}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
