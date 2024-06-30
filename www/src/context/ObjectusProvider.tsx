import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';

import React from 'react';
import { useAuth } from './AuthProvider';
import { IUserProfile } from '../services/AuthService';

type Props = { children: React.ReactNode };

type UserContextType = {
  getObjects: () => UseQueryResult<IUserProfile, Error>;
  getTGUsers: () => void;
};

const ObjectusContext = createContext<UserContextType>({} as UserContextType);

export const ObjectusProvider = ({ children }: Props) => {
  const { getUserProfile } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const getObjects = (): UseQueryResult<IUserProfile, Error> => {
    return useQuery({ queryKey: ['userProfile'], queryFn: getUserProfile });
  };
  const getTGUsers = () => {};

  return (
    <ObjectusContext.Provider value={{ getObjects, getTGUsers }}>{isReady ? children : null}</ObjectusContext.Provider>
  );
};

export const useObjectus = () => React.useContext(ObjectusContext);
