import { ReactElement } from 'react';
import { useOutlet } from 'react-router-dom';
import ProtectedRoute from '../routes/PrivateRouter';

export const AuthLayout = (): ReactElement => {
  const outlet = useOutlet();
  return (
    <>
      <ProtectedRoute>{outlet}</ProtectedRoute>
    </>
  );
};
