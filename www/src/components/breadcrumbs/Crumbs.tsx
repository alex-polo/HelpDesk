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
      <Link to={AppRoutes.USER_PROFILE.appeals}>Заявки</Link>
    </>
  );
};

export const UserSettingsCrumb = () => {
  return (
    <>
      <Link to={AppRoutes.USER_PROFILE.objectSettings}>Настройки</Link>
    </>
  );
};

export const UserAddObjectCrumb = () => {
  return (
    <>
      <Link to={AppRoutes.USER_PROFILE.createObjects}>Создание объекта</Link>
    </>
  );
};
