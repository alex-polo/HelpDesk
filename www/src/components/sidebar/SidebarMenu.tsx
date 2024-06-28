import { Accordion, Button, Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { useGetObjects } from '../../services/Objectus/hooks';

import style from './Sidebar.module.css';

export const SidebarMenu = () => {
  const { isLoading, isError, data } = useGetObjects();

  if (isLoading) <Spinner className={style.sidebar_spinner} animation="grow" variant="primary" />;

  if (isError)
    return (
      <ul className={style.sidebar_nav}>
        <li className={style.sidebar_header}>Не удалось получить данные от сервера</li>
      </ul>
    );

  return (
    <>
      <ul className={style.sidebar_nav}>
        <li className={style.sidebar_header}>Мои объекты</li>

        {data?.map((objectusObject) => (
          <Accordion key={objectusObject.id} defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{objectusObject.name}</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>
                    <NavLink to="main">Заявки</NavLink>
                  </li>
                  <li>
                    <NavLink to="main">Настройки</NavLink>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          //   <NavLink key={objectusObject.id} to="main" className="active">
          //     {objectusObject.name}
          //   </NavLink>
        ))}
        <li className={style.sidebar_link}>
          <Button className="btn btn-primary btn-sm">+ Новый объект</Button>
        </li>
      </ul>
      ;
    </>
  );
};
