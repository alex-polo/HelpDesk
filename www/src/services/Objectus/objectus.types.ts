export interface IPerson {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
}

export interface IOrganizationObjectus {
  id: number;
  name: string;
  address: string;
  inn: number;
  supervisor: string;
  description: string | null;
  isActive: boolean;
}

export interface IUserOrganizationsObjectus {
  role: string;
  organization: IOrganizationObjectus;
}

export interface IObjectObjectus {
  id: number;
  name: string;
  description: string | null;
  address: string | null;
  isActive: boolean;
}

export interface ITgUserObjectus {
  id: number;
  tg_id: number;
  firstName: string | null;
  surname: string | null;
  lastName: string | null;
  description: string | null;
  isActive: boolean;
  role: string;
}

export interface ISubjectObjectus {
  id: number;
  name: string;
  description: string | null;
  address: string | null;
  isActive: boolean;
}

export interface ISystemObjectus {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
}

export interface IEventObjectus {
  id: number;
  name: string;
  isActive: boolean;
}

export interface IPriorityObjectObjectus {
  id: number;
  name: string;
  timestamp: number;
  alertCount: number;
  isActive: boolean;
}

export interface IAppealsObjectus {
  id: number;
  task_id: string;
  title: string;
  description: string;
  openDateTimestamp: number;
  closeDateTimestamp: number | null;
  object: string;
  subject: string;
  system: string;
  flour: string;
  room: string;
  incident: string;
  priority: string;
  status: string;
}
