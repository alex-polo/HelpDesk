import { AxiosResponse } from 'axios';
import axiosInstance from '../api/AxiosInstance';
import Endpoints from '../api/Endpoints';
import { ObjectusObject, ObjectusTgUser } from '../api/models/objectus';

export const getTgUsersAPI = async (token: string): Promise<AxiosResponse<ObjectusTgUser[]>> => {
  return await axiosInstance.get<ObjectusTgUser[]>(Endpoints.OBJECTUS.get_tg_users, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getObjectsAPI = async (token: string): Promise<ObjectusObject[]> => {
  const { data } = await axiosInstance.get<ObjectusObject[]>(Endpoints.OBJECTUS.get_objects, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
