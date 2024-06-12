import { createContext, useEffect, useState } from 'react';
import { loginAPI, logoutAPI } from '../services/AuthService';
import React from 'react';

type Props = { children: React.ReactNode };

type UserContextType = {
  logout: () => void;
  isLoggedIn: () => boolean;
  loginUser: (email: string, password: string) => Promise<boolean>;
  userProfile: UserProfile | null;
  unauthorized: () => void;
};

const AuthContext = createContext<UserContextType>({} as UserContextType);

export const AuthProvider = ({ children }: Props) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const userProfileLocalStorage = localStorage.getItem('userProfile');

    if (userProfileLocalStorage) {
      setUserProfile(JSON.parse(userProfileLocalStorage));
      // console.log(`userProfile: ${userProfile}`);
      // console.log(userProfile);
      // console.log(`localStorageProfile: ${userProfileLocalStorage}`);
    }

    setIsReady(true);
  }, []);

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    unauthorized();
    const data: UserAccessToken | undefined = await loginAPI(email, password);
    if (data == undefined) {
      return false;
    } else {
      const profile: UserProfile = { email: email, access_token: data.access_token };
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setUserProfile(profile);
      return true;
    }
  };

  const isLoggedIn = (): boolean => {
    console.log(userProfile);
    // return localStorage.getItem('userProfile') != null ? true : false;
    return userProfile != null ? true : false;
  };

  const logout = () => {
    if (userProfile != null) {
      console.log(`token: ${userProfile.access_token}`);
      logoutAPI(userProfile.access_token).then(() => {
        console.log('logoutAPI');
        localStorage.removeItem('userProfile');
      });
    } else {
      console.log('token is not defined');
    }
  };

  const unauthorized = () => {
    localStorage.removeItem('userProfile');
  };

  return (
    <AuthContext.Provider value={{ userProfile, loginUser, logout, isLoggedIn, unauthorized }}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
