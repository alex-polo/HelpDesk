import { Nav, Navbar } from 'react-bootstrap';
import style from './sidebar.module.css';
import logo from '/images/logo.png';
import { SidebarMenu } from '../sidebarMenu';

function Sidebar() {
  return (
    <>
      <div id="sidebar" className="sidebar">
        <Nav defaultActiveKey="/home" className="flex-column">
          <Navbar.Brand className="text-center" href="https://108bit.ru/">
            <img className={style.header_img} src={logo} />
          </Navbar.Brand>
          <SidebarMenu />
        </Nav>
      </div>
    </>
  );
}

export default Sidebar;
