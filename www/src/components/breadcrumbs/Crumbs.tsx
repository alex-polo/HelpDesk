import { MdOutlineCottage } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../routes/AppRoutes';

export const UserProfileCrumb = () => {
  return (
    <>
      <Link to={AppRoutes.USER_PROFILE.home}>
        <MdOutlineCottage />
      </Link>
    </>
  );
};

export const UserAppealsCrumb = () => {
  return (
    <>
      {/* <Link to={AppRoutes.USER_PROFILE.}>Заявки</Link> */}
      <span>Заявки</span>
    </>
  );
};

export const UserSettingsCrumb = () => {
  return (
    <>
      {/* <Link to={AppRoutes.USER_PROFILE.objectSettings}>Настройки</Link> */}
      <span>Настройки</span>
    </>
  );
};

export const UserAddObjectCrumb = () => {
  return (
    <>
      {/* <Link to={AppRoutes.USER_PROFILE.createObjects}>Создание объекта</Link> */}
      <span>Создание объекта</span>
    </>
  );
};

export const UserAddOrganizationCrumb = () => {
  return (
    <>
      <span>Создание организации</span>
    </>
  );
};
