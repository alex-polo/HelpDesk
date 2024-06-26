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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/*" element={<RootLayout />}>
      <Route element={<QueryClientLayout />}>
        <Route element={<AuthLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
            handle={{
              crumb: () => (
                <Link to="/">
                  <MdOutlineCottage />
                </Link>
              ),
            }}
          />
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
