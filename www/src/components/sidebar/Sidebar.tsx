import { Nav, Navbar } from 'react-bootstrap';
import { AppRoutes } from '../../routes/AppRoutes';

import logo from '/images/logo.png';
import style from './Sidebar.module.css';
import { SidebarMenu } from './SidebarMenu';

export const Sidebar = () => {
  return (
    <>
      <div id="sidebar" className="sidebar">
        <Nav className="flex-column">
          <Navbar.Brand className="text-center" href={AppRoutes.USER_PROFILE.home}>
            <img className={style.header_img} src={logo} />
          </Navbar.Brand>

          <SidebarMenu />
        </Nav>
      </div>
    </>
  );
};
