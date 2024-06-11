import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { Button, Form, Spinner } from 'react-bootstrap';
import { toastNotifycationError, toastNotifycationInfo } from '../../services/NotifycationService';

import style from './loginForm.module.css';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [loginAction, setLoginAction] = useState(false);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { loginUser } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginAction(true);
    if (password.length < 6) {
      toastNotifycationInfo('Пароль должен состоять не менее чем из 6 символов');
    } else {
      const statusLogin = await loginUser(login, password);
      if (statusLogin) {
        navigate('/');
      } else {
        toastNotifycationError('Не удалось авторизоваться. Проверьте правильность логина и пароля');
      }
    }
    setLoginAction(false);
  };

  return (
    <Form onSubmit={handleSubmit} className={style.login_form}>
      <h2 className="p-2 mb-3">Авторизация</h2>
      <Form.Group className="text-start mb-3" controlId="formBasicEmail">
        <Form.Label>Логин</Form.Label>
        <Form.Control type="email" placeholder="Логин" onChange={(e) => setLogin(e.target.value)} />
      </Form.Group>
      <Form.Group className="text-start mb-4" controlId="formBasicEmail">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      {!loginAction ? (
        <Button type="submit" variant="primary">
          Войти
        </Button>
      ) : (
        <Button variant="primary" disabled>
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          &nbsp;Вход
        </Button>
      )}
    </Form>
  );
};
