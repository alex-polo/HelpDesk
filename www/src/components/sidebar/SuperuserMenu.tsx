import { NavLink } from 'react-router-dom';
import { AppRoutes } from '../../routes/AppRoutes';
import { IUserOrganizationsObjectus } from '../../services/Objectus';

type Props = {
  organizations: IUserOrganizationsObjectus[] | undefined;
};

const SuperuserMenu = (props: Props) => {
  return (
    <>
      <NavLink className="btn btn-primary btn-sm" to={AppRoutes.USER_PROFILE.createOrganization}>
        Создание Органицзации
      </NavLink>
    </>
  );
};

export default SuperuserMenu;
