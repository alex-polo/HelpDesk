import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { createObjectAPI, getObjectsAPI } from './Api';
import { IObjectObjectus } from './objectus.types';

export const useGetObjects = (): UseQueryResult<IObjectObjectus[], Error> => {
  return useQuery({
    queryKey: ['getObjectsFromObjectus'],
    queryFn: getObjectsAPI,
    select: ({ data }) => data,
  });
};

export const useAddObject = () => {
  return useQuery({
    queryKey: ['AddObjectsObjectus'],
    queryFn: getObjectsAPI,
    select: ({ data }) => data,
  });
};

export const useGetTgUsers = () => {
  return useQuery({
    queryKey: ['getTgUsersObjectus'],
    queryFn: getObjectsAPI,
    select: ({ data }) => data,
  });
};

export const useCreateObjectusObject = () => {
  return useMutation({ mutationFn: createObjectAPI });
};
