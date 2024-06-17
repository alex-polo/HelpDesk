import axios, { AxiosResponse } from 'axios';
import axiosInstance from '../api/AxiosInstance';
import Endpoints from '../api/Endpoints';

export const loginAPI = async (login: string, password: string): Promise<AxiosResponse> => {
  return await axiosInstance.post<UserAccessToken>(
    Endpoints.AUTH.login,
    { username: login, password: password },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  // return data;
  // } catch (error) {
  //   console.log(`Failed to login user: ${login}`);
  // }
};

export const logoutAPI = async (token: string) => {
  try {
    await axiosInstance.post(
      Endpoints.AUTH.logout,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
  }
};

export const getUserProfileInfoAPI = async (token: string): Promise<AxiosResponse> => {
  // try {
  return await axiosInstance.get<UserInfo>(Endpoints.AUTH.user_profile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     console.log(error.response?.data);
  //   } else {
  //     console.log(error);
  //   }
  //   return false;
  // }
};
