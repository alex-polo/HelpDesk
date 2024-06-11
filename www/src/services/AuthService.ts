import axios from 'axios';
import axiosInstance from '../api/AxiosInstance';
import Endpoints from '../api/Endpoints';

export const loginAPI = async (login: string, password: string) => {
  try {
    const { data } = await axiosInstance.post<UserAccessToken>(
      Endpoints.AUTH.login,
      { username: login, password: password },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return data;
  } catch (error) {
    console.log(`Failed to login user: ${login}`);
  }
};

export const logoutAPI = async (token: string) => {
  const { data } = await axiosInstance.post(Endpoints.AUTH.logout, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// export const getUserProfileAPI = async (token: string) => {
//   try {
//     const { data } = await axiosInstance.get<UserProfileVerify>(Endpoints.AUTH.user_profile, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     // return data;
//     return true;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log(error.response?.data);
//     } else {
//       console.log(error);
//     }
//     return false;
//   }
// };
