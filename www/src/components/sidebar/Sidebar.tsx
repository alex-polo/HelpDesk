import { Nav, Navbar } from 'react-bootstrap';
import { AppRoutes } from '../../routes/AppRoutes';

import UserMenu from './UserMenu';
import SuperuserMenu from './SuperuserMenu';
import { IUserOrganizationsObjectus, useGetUserOrganizations } from '../../services/Objectus';
import SidebarSpinner from './SidebarSpinner';

import style from './sidebar.module.css';

type Props = {
  username: string | undefined;
  isSuperUser: boolean | undefined;
};

export const Sidebar = (props: Props) => {
  const queryUserOrganizations = useGetUserOrganizations();
  const userOrganization: IUserOrganizationsObjectus[] | undefined = queryUserOrganizations.data;

  if (queryUserOrganizations.isLoading) return <SidebarSpinner />;

  return (
    <>
      <div id="sidebar" className="sidebar">
        <Nav className="flex-column">
          <Navbar.Brand className="text-center navbar-brand" href={AppRoutes.USER_PROFILE.home}>
            {/* <img className={style.header_img} src={logo} /> */}
            <span className={style.header_text}>108БИТ</span>
          </Navbar.Brand>

          {queryUserOrganizations.isLoading ? (
            // queryUserOrganizations.data?.length ? (<></>) : (<></>)
            // if (data?.length === 0) {
            //   return (
            //     <>
            //       <ul>
            //         <li>Ваш аккаунт не подтвержден</li>
            //       </ul>
            //     </>
            //   );
            // }

            // Спиннер
            <SidebarSpinner />
          ) : // Проверка на суперпользователя
          props.isSuperUser ? (
            // Отрисовываем меню супепользователя
            <SuperuserMenu organizations={queryUserOrganizations.data} />
          ) : // Отрисовываем меню обычного пользователя
          queryUserOrganizations.data != undefined ? (
            <UserMenu organizations={queryUserOrganizations.data} />
          ) : (
            <span>Error</span>
          )}
          <SidebarSpinner />
        </Nav>
      </div>
    </>
  );
};
