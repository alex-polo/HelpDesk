import { ReactElement, useState } from 'react';
import { Outlet, useOutlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Container, Spinner } from 'react-bootstrap';

import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import ProtectedRoute from '../routes/PrivateRouter';

import { useAuth } from '../context/AuthProvider';
import { ObjectusProvider } from '../context/ObjectusProvider';
import { IObjectObjectus } from '../services/Objectus';
import { useGetObjects } from '../services/Objectus/hooks';

export const DashboardLayout = (): ReactElement => {
  const outlet = useOutlet();
  // const [objects, setObjects] = useState<IObjectObjectus[]>();
  const { getUserProfile } = useAuth();
  const queryUserProfile = useQuery({ queryKey: ['userProfile'], queryFn: getUserProfile });
  // const queryObjects = useGetObjects();

  // const handleChangeObjects = (values: IObjectObjectus[]) => {
  //   setObjects(values);
  // };

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
      {/* <ProtectedRoute> */}
      <ObjectusProvider>
        <Sidebar />
        <div className="main">
          <NavBar username={queryUserProfile.isSuccess ? queryUserProfile.data?.email : 'undefined'} />

          <main className="content">
            <Breadcrumbs />
            {outlet}
            {/* <Outlet context={queryObjects.data} />; */}
          </main>
        </div>
      </ObjectusProvider>
      {/* </ProtectedRoute> */}
    </>
  );
};
