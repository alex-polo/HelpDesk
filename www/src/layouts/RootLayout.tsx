import { ReactElement } from 'react';
import { useOutlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export const RootLayout = (): ReactElement => {
  const outlet = useOutlet();
  return (
    <>
      <div className="wrapper">{outlet}</div>
      <ToastContainer autoClose={7000} />
    </>
  );
};
