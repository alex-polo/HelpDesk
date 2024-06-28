import { Link, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { MdOutlineCottage } from 'react-icons/md';
import { DashboardLayout } from './layouts/DashbordLayout';
import { RootLayout } from './layouts/RootLayout';
import { QueryClientLayout } from './layouts/QueryClientLayout';
import { NotFoundForm } from './components/NotFound';
import { AuthLayout } from './layouts/AuthLayout';
import { LoginForm } from './components/Auth';
import ProtectedRoute from './routes/PrivateRouter';

import './App.css';
import DashboardMain from './components/DashboardMain';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<QueryClientLayout />}>
      <Route path="/" element={<RootLayout />}>
        <Route element={<AuthLayout />}>
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
            handle={{
              crumb: () => (
                <Link to="/profile">
                  <MdOutlineCottage />
                </Link>
              ),
            }}
          >
            <Route index element={<DashboardMain />} />
            <Route path="objects" element={<DashboardMain />} />
          </Route>
        </Route>

        <Route path="login" element={<LoginForm />} />
      </Route>

      <Route path="*" element={<NotFoundForm />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
