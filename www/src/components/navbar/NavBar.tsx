import { Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Sling as Hamburger } from 'hamburger-react';
import { useState } from 'react';

import { useAuth } from '../../context/AuthProvider';

import style from './NavBar.module.css';

type Props = {
  username: string;
};

export const NavBar = (props: Props) => {
  const [isOpen, setOpen] = useState(false);
  const { logout } = useAuth();
  function changeSidebar() {
    (document.getElementById('sidebar') as HTMLElement).classList.toggle('sidebar_hide');
  }

  return (
    <Navbar expand="lg" className={style.navbar}>
      <Container fluid>
        <button id="sidebarCollapse" onClick={changeSidebar} className={style.toggler_button}>
          <Hamburger size={25} toggled={isOpen} toggle={setOpen} />
        </button>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
          <Form className="d-flex">
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
};
