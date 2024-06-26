import axios, { AxiosResponse } from 'axios';
import axiosInstance from '../api/AxiosInstance';
import Endpoints from '../api/Endpoints';

export interface IUserAccessToken {
  access_token: string;
  token_type: string;
}

export interface IUserLoginData {
  email: string;
  password: string;
}

export interface IUserProfile {
  id: number;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  is_tg_bot: boolean;
}

export const loginAPI = async (login: string, password: string): Promise<AxiosResponse> => {
  return await axiosInstance.post<IUserAccessToken>(
    Endpoints.AUTH.login,
    { username: login, password: password },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
};

export const logoutAPI = async () => {
  try {
    await axiosInstance.post(Endpoints.AUTH.logout, {});
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
  }
};

export const getProfileAPI = async (): Promise<AxiosResponse> => {
  return await axiosInstance.get<IUserProfile>(Endpoints.AUTH.user_profile);
};
