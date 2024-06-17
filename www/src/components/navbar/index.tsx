import { Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useAuth } from '../../context/AuthProvider';
// import logout_img from '/images/logout.svg';

import style from './navbar.module.css';

type Props = {
  username: string;
};

function NavBar(props: Props) {
  const { logout } = useAuth();
  function changeSidebar() {
    (document.getElementById('sidebar') as HTMLElement).classList.toggle('sidebar_hide');
  }

  return (
    <Navbar expand="lg" className="shadow">
      <Container fluid>
        <button id="sidebarCollapse" onClick={changeSidebar} className={style.toggler_button}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
          <Form className="d-flex">
            {/* <img src={logout_img} /> */}
            {/* <img className={style.header_img} src={logout_img} /> */}
            <NavDropdown title={props.username} id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Настройки профиля</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Выход</NavDropdown.Item>
            </NavDropdown>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
