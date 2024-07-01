import { Navigate } from 'react-router-dom';
import { useGetObjects } from '../../../services/Objectus/hooks';
import { AppRoutes } from '../../../routes/AppRoutes';
import { Spinner } from 'react-bootstrap';

export const DashboardHome = () => {
  const { isLoading, isError, data } = useGetObjects();

  if (isLoading) <Spinner animation="grow" variant="primary" />;

  if (isError) {
    return (
      <>
        <h1>Error</h1>
      </>
    );
  }

  if (data?.length === 0) {
    return <Navigate to={AppRoutes.USER_PROFILE.createObject} replace />;
  }

  return (
    <>
      <h1>Welcome to 108BIT</h1>
      {/* <h2>{data}</h2> */}
    </>
  );
};
