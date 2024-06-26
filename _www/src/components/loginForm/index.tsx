import { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useMutation } from '@tanstack/react-query';

import { useAuth } from '../../context/AuthProvider';
import { toastNotifycationError, toastNotifycationInfo } from '../../services/NotifycationService';

import style from './loginForm.module.css';

export const LoginForm = () => {
  const { loginUser } = useAuth();
  const loginMutation = useMutation({ mutationFn: loginUser });

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password.length < 6) {
      toastNotifycationInfo('Пароль должен состоять не менее чем из 6 символов');
    } else {
      const loginData: UserLoginData = {
        email: login,
        password: password,
      };

      loginMutation.mutate(loginData);
    }
  };

  if (loginMutation.isError) {
    toastNotifycationError('Не удалось авторизоваться. Проверьте правильность логина и пароля');
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className={style.login_form}>
        <h2 className="p-2 mb-3">Авторизация</h2>
        <Form.Group className="text-start mb-3" controlId="formBasicEmail">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="email"
            placeholder="Логин"
            disabled={loginMutation.isPending}
            onChange={(e) => setLogin(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="text-start mb-4" controlId="formBasicEmail">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Пароль"
            disabled={loginMutation.isPending}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {!loginMutation.isPending ? (
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
    </>
  );
};
