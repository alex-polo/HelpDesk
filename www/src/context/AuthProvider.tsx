import { createContext, useEffect, useState } from 'react';
import { getUserProfileAPI, loginAPI, logoutAPI } from '../services/AuthService';
import React from 'react';

type Props = { children: React.ReactNode };

type UserContextType = {
  logout: () => void;
  isLoggedIn: () => boolean;
  loginUser: (email: string, password: string) => Promise<boolean>;
  userProfile: UserProfile;
};

const AuthContext = createContext<UserContextType>({} as UserContextType);

export const AuthProvider = ({ children }: Props) => {
  const [userProfile, setUserProfile] = useState<UserProfile>({ email: 'None', access_token: 'None' });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const userProfileLocalStorage = localStorage.getItem('userProfile');
    console.log(userProfileLocalStorage);

    if (userProfileLocalStorage) {
      setUserProfile(JSON.parse(userProfileLocalStorage));
    }

    setIsReady(true);
  }, []);

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    const data: UserAccessToken | undefined = await loginAPI(email, password);
    if (data == undefined) {
      return false;
    } else {
      const profile: UserProfile = { email: email, access_token: data.access_token };
      localStorage.setItem('userProfile', JSON.stringify(profile));

      return true;
    }
  };

  const isLoggedIn = (): boolean => {
    return localStorage.getItem('userProfile') != null ? true : false;
  };

  const logout = () => {
    // logoutAPI(userProfile.access_token).then((
    // ) => {
    //   console.log('logout');
    //   localStorage.removeItem('userProfile');
  };

  return (
    <AuthContext.Provider value={{ loginUser, logout, isLoggedIn, userProfile }}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
