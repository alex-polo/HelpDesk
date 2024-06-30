import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashbordLayout';
import { RootLayout } from './layouts/RootLayout';
import { NotFoundForm } from './components/NotFound';
import { LoginForm } from './components/Auth';

import { AppRoutes } from './routes/AppRoutes';
import { DashboardHome, ObjectAppeals, ObjectSettings } from './components/DashboardContent';

import './App.css';
import { UserAddObjectCrumb, UserAppealsCrumb, UserProfileCrumb, UserSettingsCrumb } from './components/Breadcrumbs';
import { HomePage } from './components/HomePage';
import CreateObject from './components/DashboardContent/CreateObject';
import { AuthLayout } from './layouts/AuthLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={AppRoutes.PUBLIC.home} element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFoundForm />} />
      <Route path="login" element={<LoginForm />} />
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
            path={AppRoutes.USER_PROFILE.appeals}
            element={<ObjectAppeals />}
            handle={{
              crumb: () => <UserAppealsCrumb />,
            }}
          />
          <Route
            path={AppRoutes.USER_PROFILE.objectSettings}
            element={<ObjectSettings />}
            handle={{
              crumb: () => <UserSettingsCrumb />,
            }}
          />
          {/* <Route
          path={AppRoutes.USER_PROFILE.noObjects}
          element={<NoObjects />}
          handle={{
            crumb: () => <UserAddObjectCrumb />,
          }}
        /> */}
          <Route
            path={AppRoutes.USER_PROFILE.createObjects}
            element={<CreateObject />}
            handle={{
              crumb: () => <UserAddObjectCrumb />,
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
