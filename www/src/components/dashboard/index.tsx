import { ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import NavBar from '../navbar';
import Sidebar from '../sidebar';
import { useAuth } from '../../context/AuthProvider';
import { Spinner } from 'react-bootstrap';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { MainContent } from '../mainContent';
import Breadcrumbs from '../breadcrumbs';
import AppRoutes from '../../routes/AppRoutes';

type Props = {};

export const Dashboard = (props: Props): ReactElement => {
  const { getUserInfo } = useAuth();
  const queryUserInfo = useQuery({ queryKey: ['userInfo'], queryFn: getUserInfo });

  if (queryUserInfo.isLoading) {
    return (
      <>
        <div className="main">
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Routes>
          <Route
            path="main"
            element={<MainContent />}
            handle={{
              // `crumb` is your own abstraction, we decided
              // to make this one a function so we can pass
              // the data from the loader to it so that our
              // breadcrumb is made up of dynamic content
              crumb: () => <Link to={AppRoutes.USER_PROFILE.home}>MAIN</Link>,
            }}
          />
        </Routes>
        <Sidebar />
        <div className="main">
          <NavBar username={queryUserInfo.isSuccess ? queryUserInfo.data?.email : 'undefined'} />
          <Breadcrumbs />
          <Outlet />
          {/* <DashboardLayout /> */}
          {/* <MainContent /> */}
        </div>
      </>
    );
  }
};
