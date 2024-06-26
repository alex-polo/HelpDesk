// import { ReactElement, useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/PrivateRouter';
import AppRoutes from './routes/AppRoutes';
import { LoginForm } from './components/loginForm';
import { Dashboard } from './components/dashboard';
import { ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';
import { NotFound } from './components/notFound';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>

//     </>
//   )
// );

function App(): ReactElement {
  return (
    <>
      <div className="wrapper">
        {/* <RouterProvider router={router} /> */}
        <Routes>
          <Route path={AppRoutes.AUTH.login} element={<LoginForm />} />
          <Route
            path={AppRoutes.USER_PROFILE.home}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
            handle={{
              // `crumb` is your own abstraction, we decided
              // to make this one a function so we can pass
              // the data from the loader to it so that our
              // breadcrumb is made up of dynamic content
              crumb: () => <Link to={AppRoutes.USER_PROFILE.home}>Домашняя</Link>,
            }}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer autoClose={7000} />
    </>
  );
}

export default App;
