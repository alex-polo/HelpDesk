import { AxiosResponse } from 'axios';
import axiosInstance from '../../api/AxiosInstance';
import Endpoints from '../../api/Endpoints';
import { IObjectObjectus } from './objectus.types';

// export const getTgUsersAPI = async (token: string): Promise<AxiosResponse<IObjectusTgUser[]>> => {
//   return await axiosInstance.get<IObjectusTgUser[]>(Endpoints.OBJECTUS.get_tg_users, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

export const getObjectsAPI = async (): Promise<AxiosResponse<IObjectObjectus[]>> => {
  return await axiosInstance.get<IObjectObjectus[]>(Endpoints.OBJECTUS.get_objects);
};

export const createObjectAPI = async (name: string, description: string): Promise<boolean> => {
  const { status } = await axiosInstance.post(
    Endpoints.AUTH.login,
    { username: name, password: description },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  if (status === 201) return true;
  return false;
};
