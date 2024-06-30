export const AppRoutes = {
  AUTH: {
    login: '/login',
    logout: '/logout',
  },
  USER_PROFILE: {
    home: '/profile',
    createObject: 'create-object',

    appealsRoute: 'appeals/:objectName',
    noObjectsRoute: 'no-objects/:objectName',
    createObjectsRoute: 'create-object/:objectName',
    objectSettingsRoute: 'object-settings/:objectName',
    homeLink: (objectName: string) => `/profile/${objectName}`,
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
