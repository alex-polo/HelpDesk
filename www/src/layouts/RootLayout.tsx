import { ReactElement } from 'react';
import { useOutlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/AuthProvider';

export const RootLayout = (): ReactElement => {
  const outlet = useOutlet();
  return (
    <>
      <AuthProvider>
        <div className="wrapper">{outlet}</div>
        <ToastContainer autoClose={7000} />
      </AuthProvider>
    </>
  );
};
