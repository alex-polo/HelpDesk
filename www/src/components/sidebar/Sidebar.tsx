import { Nav, Navbar } from 'react-bootstrap';
import { AppRoutes } from '../../routes/AppRoutes';

import SidebarMenu from './UserMenu';
import { AdminMenu } from './AdminMenu';

type Props = {
  username: string | undefined;
  isSuperUser: boolean | undefined;
};

export const Sidebar = (props: Props) => {
  return (
    <>
      <div id="sidebar" className="sidebar">
        <Nav className="flex-column">
          <Navbar.Brand className="text-center navbar-brand" href={AppRoutes.USER_PROFILE.home}>
            {/* <img className={style.header_img} src={logo} /> */}
            <span className="header-text">108БИТ</span>
          </Navbar.Brand>

          {!props.isSuperUser ? <AdminMenu /> : <SidebarMenu />}
        </Nav>
      </div>
    </>
  );
};
