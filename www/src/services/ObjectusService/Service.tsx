import { AxiosResponse } from 'axios';
import axiosInstance from '../../api/AxiosInstance';
import Endpoints from '../../api/Endpoints';
import { IObjectusObject, IObjectusTgUser } from './Service.types';

export const getTgUsersAPI = async (token: string): Promise<AxiosResponse<IObjectusTgUser[]>> => {
  return await axiosInstance.get<IObjectusTgUser[]>(Endpoints.OBJECTUS.get_tg_users, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getObjectsAPI = async (): Promise<IObjectusObject[]> => {
  const { data } = await axiosInstance.get<IObjectusObject[]>(Endpoints.OBJECTUS.get_objects);
  return data;
};

export const createObjectAPI = async (login: string, password: string): Promise<boolean> => {
  const { status } = await axiosInstance.post(
    Endpoints.AUTH.login,
    { username: login, password: password },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  if (status === 201) return true;
  return false;
};
