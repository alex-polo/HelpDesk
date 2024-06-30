import { Container } from 'react-bootstrap';
import { AppRoutes } from '../../routes/AppRoutes';

export const HomePage = () => {
  return (
    <>
      <Container>
        <h1>Добро пожаловать</h1>
        <h2>108БИТ</h2>
        <a href={AppRoutes.USER_PROFILE.home}>Войти</a>
      </Container>
    </>
  );
};
