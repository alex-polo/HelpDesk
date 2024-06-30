import { ReactElement } from 'react';
import { useOutlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Container, Spinner } from 'react-bootstrap';

import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';

import { useAuth } from '../context/AuthProvider';
import { ObjectusProvider } from '../context/ObjectusProvider';

export const DashboardLayout = (): ReactElement => {
  const outlet = useOutlet();
  const { getUserProfile } = useAuth();
  const queryUserProfile = useQuery({ queryKey: ['userProfile'], queryFn: getUserProfile });

  if (queryUserProfile.isLoading) {
    return (
      <>
        <Container className="load-spinner">
          <Spinner animation="border" variant="light" />
        </Container>
      </>
    );
  }

  if (queryUserProfile.isError) {
    console.log(queryUserProfile.error);
    return (
      <>
        <Container>
          <div className="error-container">
            <h1>Internal error</h1>
            <h3>Try again later</h3>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <ObjectusProvider>
        <Sidebar />
        <div className="main">
          <NavBar username={queryUserProfile.isSuccess ? queryUserProfile.data?.email : 'undefined'} />

          <main className="content">
            <Breadcrumbs />
            {outlet}
          </main>
        </div>
      </ObjectusProvider>
    </>
  );
};
