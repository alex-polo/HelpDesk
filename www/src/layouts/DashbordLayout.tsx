import { ReactElement } from 'react';
import { useOutlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'react-bootstrap';

import { Breadcrumbs } from '../components/Breadcrumbs';
import { useAuth } from '../context/AuthProvider';
import Sidebar from '../components/Sidebar/Sidebar';
import NavBar from '../components/NavBar';

export const DashboardLayout = (): ReactElement => {
  const { getUserProfile } = useAuth();
  const queryUserProfile = useQuery({ queryKey: ['userInfo'], queryFn: getUserProfile });
  const outlet = useOutlet();

  if (queryUserProfile.isLoading) {
    return (
      <>
        <div className="main">
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
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
        <Breadcrumbs />
        {outlet}
        {/* <DashboardLayout /> */}
        {/* <MainContent /> */}
      </div>

      {/* <div>
        <h1>Dash</h1>
        <Breadcrumbs />
        {outlet}
      </div> */}
    </>
  );
};

// import { Link, Outlet, Route, Routes } from 'react-router-dom';

// type Props = {};

// export const Dashboard = (props: Props): ReactElement => {
//   const { getUserInfo } = useAuth();
//   const queryUserInfo = useQuery({ queryKey: ['userInfo'], queryFn: getUserInfo });

//   if (queryUserInfo.isLoading) {
//     return (
//       <>
//         <div className="main">
//           <Spinner animation="grow" variant="primary" />
//           <Spinner animation="grow" variant="primary" />
//           <Spinner animation="grow" variant="primary" />
//         </div>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <Routes>
//           <Route
//             path="main"
//             element={<MainContent />}
//             handle={{
//               // `crumb` is your own abstraction, we decided
//               // to make this one a function so we can pass
//               // the data from the loader to it so that our
//               // breadcrumb is made up of dynamic content
//               crumb: () => <Link to={AppRoutes.USER_PROFILE.home}>MAIN</Link>,
//             }}
//           />
//         </Routes>
//         <Sidebar />
//         <div className="main">
//           <NavBar username={queryUserInfo.isSuccess ? queryUserInfo.data?.email : 'undefined'} />
//           <Breadcrumbs />
//           <Outlet />
//           {/* <DashboardLayout /> */}
//           {/* <MainContent /> */}
//         </div>
//       </>
//     );
//   }
// };
