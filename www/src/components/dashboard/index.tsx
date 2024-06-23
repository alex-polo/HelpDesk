import { ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import NavBar from '../navbar';
import Sidebar from '../sidebar';
import { useAuth } from '../../context/AuthProvider';
import { Spinner } from 'react-bootstrap';
import { DashboardLayout } from '../dashboardLayout';
import { Outlet, Route, Routes } from 'react-router-dom';
import { MainContent } from '../mainContent';

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
          <Route path="main" element={<MainContent />} />
        </Routes>
        <Sidebar />
        <div className="main">
          <NavBar username={queryUserInfo.isSuccess ? queryUserInfo.data?.email : 'undefined'} />

          <Outlet />
          {/* <DashboardLayout /> */}
          {/* <MainContent /> */}
        </div>
      </>
    );
  }
};
