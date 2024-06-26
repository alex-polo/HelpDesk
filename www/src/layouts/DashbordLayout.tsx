import { ReactElement } from 'react';
import { useOutlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'react-bootstrap';

import { useAuth } from '../context/AuthProvider';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardMain';

export const DashboardLayout = (): ReactElement => {
  const { getUserProfile } = useAuth();
  const queryUserProfile = useQuery({ queryKey: ['userProfile'], queryFn: getUserProfile });
  const outlet = useOutlet();

  if (queryUserProfile.isLoading) {
    return (
      <>
        <div className="main">
          <Spinner animation="grow" variant="primary" />
        </div>
      </>
    );
  }

  if (queryUserProfile.isError) {
    return (
      <>
        <h1>Internal error</h1>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="main">
        <NavBar username={queryUserProfile.isSuccess ? queryUserProfile.data?.email : 'undefined'} />
        {outlet}
        <DashboardContent />
      </div>
    </>
  );
};
