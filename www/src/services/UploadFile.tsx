import axiosInstance from '../api/axiosInstance';
import Endpoints from '../api/endpoints';

export const uploadFile = async (formData: FormData) => {
  const { status } = await axiosInstance.post(Endpoints.AUTH.upload_file, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Cache-Control': 'no-cache',
      // 'Access-Control-Allow-Origin': '*',
    },
  });

  return status == 200 ? true : false;
};
