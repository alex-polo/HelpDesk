import { Nav, Navbar } from 'react-bootstrap';
import logo from '/images/logo.png';
import { AppRoutes } from '../../routes/AppRoutes';
// import { SidebarMenu } from '../sidebarMenu';

import style from './Sidebar.module.css';

function Sidebar() {
  return (
    <>
      <div id="sidebar" className="sidebar">
        <Nav className="flex-column">
          <Navbar.Brand className="text-center" href={AppRoutes.USER_PROFILE.home}>
            <img className={style.header_img} src={logo} />
          </Navbar.Brand>

          {/* <SidebarMenu /> */}
        </Nav>
      </div>
    </>
  );
}

export default Sidebar;
