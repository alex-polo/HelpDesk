import { Button, Nav, Navbar, Spinner } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';

import { AppRoutes } from '../../routes/AppRoutes';
import { getObjectsAPI } from '../../services/ObjectusService';

import style from './Sidebar.module.css';
import logo from '/images/logo.png';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['getObjectusObjects'],
    queryFn: () => getObjectsAPI(),
  });
  // if (isPending) return <>'Loading...'</>;
  // if (error) return <>error</>;

  if (isLoading)
    return (
      <>
        <Spinner className={style.sidebar_spinner} animation="grow" variant="primary" />
        <Spinner className={style.sidebar_spinner} animation="grow" variant="primary" />
        <Spinner className={style.sidebar_spinner} animation="grow" variant="primary" />
      </>
    );

  if (isError)
    return (
      <>
        <ul className={style.sidebar_nav}>
          <li className={style.sidebar_header}>Не удалось получить данные от сервера</li>
        </ul>
      </>
    );

  console.log(data);

  return (
    <>
      return (
      <>
        <NavLink to="main" className="active">
          Messages
        </NavLink>

        <ul className={style.sidebar_nav}>
          <li className={style.sidebar_header}>Мои объекты</li>

          {data?.map((objectusObject) => (
            <li key={objectusObject.id}>
              <a className={style.sidebar_link}>
                <span>{objectusObject.name}</span>
              </a>
            </li>
          ))}
          <li className={style.sidebar_link}>
            <Button className="btn btn-primary btn-sm">+ Новый объект</Button>
          </li>
        </ul>

        {/* <ul className={style.sidebar_nav}>
        <li className={style.sidebar_header}>Настройки</li>
        <li className={style.sidebar_link}>
          <a className="sidebar-link" href="pages-profile.html">
            <span className="align-middle">Profile</span>
          </a>
        </li>
      </ul> */}
      </>
      );
    </>
  );
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
};
