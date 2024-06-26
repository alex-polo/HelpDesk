import { Outlet } from 'react-router-dom';

export const DashboardLayout = (): React.ReactElement => {
  return (
    <>
      <Outlet />
    </>
  );
};
