import { AxiosResponse } from 'axios';
import axiosInstance from '../../api/AxiosInstance';
import Endpoints from '../../api/Endpoints';
import { IObjectObjectus, IOrganizationObjectus, IUser, IUserOrganizationsObjectus } from './objectus.types';

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
    short_name: organization.short_name,
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
    short_name: organization.short_name,
    address: organization.address,
    inn: organization.inn,
    supervision: organization.supervisor,
    description: organization.description,
    is_Active: organization.isActive,
  });
};

export const getAllUsersObjectusAPI = async (): Promise<AxiosResponse<IUser[]>> => {
  return await axiosInstance.get<IUser[]>(Endpoints.OBJECTUS.update_organization);
};
