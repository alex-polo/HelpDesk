import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import { IObjectObjectus } from '../../../services/Objectus';
import { useGetObjects } from '../../../services/Objectus/hooks';
import { AppRoutes } from '../../../routes/AppRoutes';
import { Spinner } from 'react-bootstrap';

export const DashboardHome = () => {
  const navigate = useNavigate();
  // const objects: IObjectObjectus[] = useOutletContext();
  // console.log(objects.length);

  const { isLoading, isError, data } = useGetObjects();

  if (isLoading) <Spinner animation="grow" variant="primary" />;

  if (data?.length === 1) {
    // navigate(AppRoutes.USER_PROFILE.createObjects);
    <Navigate to={AppRoutes.USER_PROFILE.noObjects} state={{ from: location }} replace />;
  }

  return (
    <>
      <h1>Welcome to 108BIT</h1>
      {/* <h2>{data}</h2> */}
    </>
  );
};
