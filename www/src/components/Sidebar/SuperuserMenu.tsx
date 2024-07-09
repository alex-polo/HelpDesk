import { NavLink } from 'react-router-dom';
import { AppRoutes } from '../../routes/AppRoutes';
import { IUserOrganizationsObjectus } from '../../services/Objectus';

import style from './sidebar.module.css';

type Props = {
  organizations: IUserOrganizationsObjectus[] | undefined;
};

const SuperuserMenu = (props: Props) => {
  return (
    <>
      <ul>
        <li className={style.sidebar_header}>Системные настройки</li>
        <li>
          <NavLink className={style.sidebar_header_link} to={AppRoutes.USER_PROFILE.managementOrganizations}>
            Управление организациями
          </NavLink>
        </li>
        <li>
          <NavLink className={style.sidebar_header_link} to={AppRoutes.USER_PROFILE.createOrganization}>
            Пользователи
          </NavLink>
        </li>
      </ul>
      <ul>
        <li className={style.sidebar_header}>Организации</li>
        {props.organizations == undefined ? (
          <li className={style.sidebar_header}>Организации не получены от сервера</li>
        ) : props.organizations.length === 0 ? (
          <li className={style.sidebar_header}>У вас нет привязанных организаций</li>
        ) : (
          props.organizations.map((organization: IUserOrganizationsObjectus) => (
            <li>
              {organization.role === 'owner' ? (
                <NavLink
                  className={style.sidebar_header_link}
                  to={AppRoutes.USER_PROFILE.managementOrganizationLink(organization.organization.name)}
                >
                  {organization.organization.name}
                </NavLink>
              ) : (
                <></>
              )}
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default SuperuserMenu;
