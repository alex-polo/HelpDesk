import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashbordLayout';

import { RootLayout } from './layouts/RootLayout';
import { NotFoundForm } from './components/NotFound';
import { BitrixForm } from './components/DashboardContent/Forms/BitrixForm';
import { LoginForm } from './components/Auth';
import { AppRoutes } from './routes/AppRoutes';
import { HomePage } from './components/HomePage';
import { AuthLayout } from './layouts/AuthLayout';
import {
  ManagementOrganizationCrumb,
  UserAddObjectCrumb,
  UserAddOrganizationCrumb,
  UserAppealsCrumb,
  UserProfileCrumb,
  UserSettingsCrumb,
} from './components/Breadcrumbs';
import {
  CreateOrganizationForm,
  DashboardHome,
  ManagementOrganization,
  ObjectAppeals,
  ObjectSettings,
} from './components/DashboardContent';
import CreateObject from './components/DashboardContent/CreateObject';
import { CreateOrganizationFormModal } from './components/DashboardContent/Forms/CreateOrganizationModal';

import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={AppRoutes.PUBLIC.home} element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="bitrform" element={<BitrixForm />} />
      <Route path="neworg" element={<CreateOrganizationFormModal />} />
      <Route path="*" element={<NotFoundForm />} />
      <Route element={<AuthLayout />}>
        <Route
          path={`${AppRoutes.USER_PROFILE.home}/*`}
          element={<DashboardLayout />}
          handle={{
            crumb: () => <UserProfileCrumb />,
          }}
        >
          <Route index element={<DashboardHome />} />
          <Route
            path={AppRoutes.USER_PROFILE.managementOrganizations}
            element={<ManagementOrganization />}
            handle={{
              crumb: () => <ManagementOrganizationCrumb />,
            }}
          />
          <Route
            path={AppRoutes.USER_PROFILE.appealsRoute}
            element={<ObjectAppeals />}
            handle={{
              crumb: () => <UserAppealsCrumb />,
            }}
          />
          <Route
            path={AppRoutes.USER_PROFILE.objectSettingsRoute}
            element={<ObjectSettings />}
            handle={{
              crumb: () => <UserSettingsCrumb />,
            }}
          />

          <Route
            path={AppRoutes.USER_PROFILE.createObject}
            element={<CreateObject />}
            handle={{
              crumb: () => <UserAddObjectCrumb />,
            }}
          />
          <Route
            path={AppRoutes.USER_PROFILE.createOrganization}
            element={<CreateOrganizationForm />}
            handle={{
              crumb: () => <UserAddOrganizationCrumb />,
            }}
          />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
