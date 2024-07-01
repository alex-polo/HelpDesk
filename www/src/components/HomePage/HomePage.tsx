import { Container } from 'react-bootstrap';
import { AppRoutes } from '../../routes/AppRoutes';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <>
      <Container>
        <h1>Добро пожаловать</h1>
        <h2>108БИТ</h2>
        <Link to={AppRoutes.USER_PROFILE.home}>Войти</Link>
        {/* <a href={AppRoutes.USER_PROFILE.home}>Войти</a> */}
      </Container>
    </>
  );
};
