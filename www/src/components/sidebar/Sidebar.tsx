import { Nav, Navbar } from 'react-bootstrap';
import { AppRoutes } from '../../routes/AppRoutes';

import SidebarMenu from './SidebarMenu';
import { useGetObjects } from '../../services/Objectus/hooks';
import { Navigate, useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();

  const { isLoading, isError, data } = useGetObjects();

  if (data?.length === 1) {
    // navigate(AppRoutes.USER_PROFILE.createObjects);
    // <Navigate to={AppRoutes.AUTH.login} state={{ from: location }} replace />;
  }

  // if (data?.length === 1) navigate(AppRoutes.USER_PROFILE.createObjects);

  return (
    <>
      <div id="sidebar" className="sidebar">
        <Nav className="flex-column">
          <Navbar.Brand className="text-center navbar-brand" href={AppRoutes.USER_PROFILE.home}>
            {/* <img className={style.header_img} src={logo} /> */}
            <span className="header-text">108БИТ</span>
          </Navbar.Brand>

          <SidebarMenu />
        </Nav>
      </div>
    </>
  );
};
