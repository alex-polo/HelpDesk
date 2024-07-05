export const AppRoutes = {
  AUTH: {
    login: '/login',
    logout: '/logout',
  },
  USER_PROFILE: {
    home: '/profile',
    createObject: 'create-object',
    createOrganization: 'create-organization',
    managementOrganizations: 'management-organizations',

    managementOrganizationRoute: 'management-organization/:name',

    appealsRoute: 'appeals/:objectName',
    noObjectsRoute: 'no-objects/:objectName',
    objectSettingsRoute: 'object-settings/:objectName',

    managementOrganizationLink: (organizationName: string) => `management-organization/${organizationName}`,
    appealsLink: (objectName: string) => `appeals/${objectName}`,
    noObjectsLink: (objectName: string) => `no-objects/${objectName}`,
    objectSettingsLink: (objectName: string) => `object-settings/${objectName}`,
  },
  PUBLIC: {
    home: '/',
  },
  ADMIN_PROFILE: {
    admin: 'admin',
  },
};
