import { Button, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useAuth } from '../../context/AuthProvider';

import style from './navbar.module.css';

type Props = {};

function NavBar(props: Props) {
  const { userProfile, logout } = useAuth();
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
            <NavDropdown title={userProfile?.email} id="basic-nav-dropdown">
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
