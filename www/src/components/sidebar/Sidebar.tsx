import { Nav, Navbar } from 'react-bootstrap';
import { AppRoutes } from '../../routes/AppRoutes';

import SidebarMenu from './SidebarMenu';

export const Sidebar = () => {
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
