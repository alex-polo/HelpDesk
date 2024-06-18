import { ReactElement } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Button, Container, Row, Spinner } from 'react-bootstrap';

import style from './sidebarMenu.module.css';
import { getObjectsAPI } from '../../services/ObjectusService';
import { useAuth } from '../../context/AuthProvider';

export const SidebarMenu = (): ReactElement => {
  const { getToken } = useAuth();
  const { isLoading, isError, data } = useQuery({
    queryKey: ['getObjectusObjects'],
    queryFn: () => getObjectsAPI(getToken()),
  });
  // if (isPending) return <>'Loading...'</>;
  // if (error) return <>error</>;

  if (isLoading)
    return (
      <>
        {/* <Spinner animation="border" className={style.sidebar_spinner} variant="primary" /> */}
        <Spinner className={style.sidebar_spinner} animation="grow" variant="primary" />
        <Spinner className={style.sidebar_spinner} animation="grow" variant="primary" />
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

  return (
    <>
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

      <ul className={style.sidebar_nav}>
        <li className={style.sidebar_header}>Настройки</li>
        <li className={style.sidebar_link}>
          <a className="sidebar-link" href="pages-profile.html">
            <span className="align-middle">Profile</span>
          </a>
        </li>
      </ul>
    </>
  );
};
