import { Button, Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { useGetObjects } from '../../services/Objectus/hooks';

import style from './Sidebar.module.css';

export const SidebarMenu = () => {
  const { isLoading, isError, data } = useGetObjects();

  if (isLoading)
    return (
      <>
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
  return (
    <>
      <ul className={style.sidebar_nav}>
        <li className={style.sidebar_header}>Мои объекты</li>

        {data?.map((objectusObject) => (
          <NavLink key={objectusObject.id} to="main" className="active">
            {objectusObject.name}
          </NavLink>
        ))}
        <li className={style.sidebar_link}>
          <Button className="btn btn-primary btn-sm">+ Новый объект</Button>
        </li>
      </ul>
      <ul className={style.sidebar_nav}>
        <li className={style.sidebar_header}>Настройки</li>
        <li className={style.sidebar_link}>
          <a className="sidebar-link" href="pages-profile.html">
            <span className="align-middle">Profile</span>
          </a>
        </li>
      </ul>
      ;
    </>
  );
};
