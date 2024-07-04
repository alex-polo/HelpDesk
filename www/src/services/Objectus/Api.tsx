import { AxiosResponse } from 'axios';
import axiosInstance from '../../api/AxiosInstance';
import Endpoints from '../../api/Endpoints';
import { IObjectObjectus, IOrganizationObjectus, IUserOrganizationsObjectus } from './objectus.types';

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

export const createObjectAPI = async (object: IObjectObjectus): Promise<AxiosResponse> => {
  return await axiosInstance.post(Endpoints.OBJECTUS.create_object, {
    name: object.name,
    description: object.description,
  });
};

export const createOrganizationAPI = async (organization: IOrganizationObjectus): Promise<AxiosResponse> => {
  return await axiosInstance.post(Endpoints.OBJECTUS.create_organization, {
    name: organization.name,
    address: organization.address,
    inn: organization.inn,
    supervisor: organization.supervisor,
    description: organization.description,
    is_active: organization.isActive,
  });
};

export const getOrganizationAPI = async (): Promise<AxiosResponse<IUserOrganizationsObjectus[]>> => {
  return await axiosInstance.get<IUserOrganizationsObjectus[]>(Endpoints.OBJECTUS.get_organization);
};

export const updateOrganizationAPI = async (organization: IOrganizationObjectus): Promise<AxiosResponse> => {
  return await axiosInstance.post(Endpoints.OBJECTUS.update_organization, {
    id: 0,
    name: organization.name,
    address: organization.address,
    inn: organization.inn,
    supervision: organization.supervisor,
    description: organization.description,
    is_Active: organization.isActive,
  });
};
