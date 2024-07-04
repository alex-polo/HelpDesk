import { Accordion, Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { useGetObjects } from '../../services/Objectus/hooks';

import { AppRoutes } from '../../routes/AppRoutes';
import { IUserOrganizationsObjectus } from '../../services/Objectus';

import style from './Sidebar.module.css';

type Props = {
  organizations: IUserOrganizationsObjectus[];
};

const UserMenu = (props: Props) => {
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
      {props.organizations.map((userOrganization) => (
        <ul>
          <li className="header_text">
            {userOrganization.organization.name} | {userOrganization.role}
          </li>
          <li>Объекты</li>
          <NavLink className="btn btn-primary btn-sm" to={AppRoutes.USER_PROFILE.createObject}>
            + Новый объект
          </NavLink>
          <li>Настройки</li>
          <NavLink to={AppRoutes.USER_PROFILE.appealsLink(userOrganization.organization.name)}>
            Заявки по организации
          </NavLink>
        </ul>
      ))}
      <ul>
        <li>Органицзация</li>

        <ul className={style.sidebar_nav}>
          <li className={style.sidebar_header}>Мои объекты</li>

          {data?.map((objectusObject) => (
            <Accordion key={objectusObject.id} defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{objectusObject.name}</Accordion.Header>
                <Accordion.Body>
                  <ul>
                    <li>
                      <NavLink to={AppRoutes.USER_PROFILE.appealsLink(objectusObject.name)}>Заявки</NavLink>
                    </li>
                    <li>
                      <NavLink to={AppRoutes.USER_PROFILE.objectSettingsLink(objectusObject.name)}>Настройки</NavLink>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
          <li className={style.sidebar_link}>
            <NavLink className="btn btn-primary btn-sm" to={AppRoutes.USER_PROFILE.createObject}>
              + Новый объект
            </NavLink>
          </li>
        </ul>
      </ul>
      ;
    </>
  );
};

export default UserMenu;
