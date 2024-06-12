import { Nav, Navbar } from 'react-bootstrap';
import style from './sidebar.module.css';
import logo from '/logo.png';

function Sidebar() {
  return (
    <>
      <div id="sidebar" className="sidebar">
        <Nav defaultActiveKey="/home" className="flex-column">
          {/* <Navbar.Brand className={style.sidebar_brand} href="/">
            Объектус
          </Navbar.Brand> */}
          <Navbar.Brand className="text-center" href="https://108bit.ru/">
            <img className={style.header_img} src={logo} />
          </Navbar.Brand>

          <span className={style.sidebar_header}>Мои объекты</span>
          <Nav.Link href="/#">Объект 1</Nav.Link>
          <Nav.Link href="/#">+ Добавить Объект</Nav.Link>
          {/* <Nav.Link eventKey="link-1">Link</Nav.Link>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link> */}
        </Nav>
      </div>
    </>
  );
}

export default Sidebar;
