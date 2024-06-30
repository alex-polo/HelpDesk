import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { IObjectObjectus, useCreateObjectusObject } from '../../../services/Objectus';

import style from './Form.module.css';

export const CreateObject = () => {
  const [nameObject, setNameObject] = useState<string>('');
  const [descriptionObject, SetDescriptionObject] = useState<string>('');
  // const createObjectMutation = useMutation({ mutationFn: loginUser });
  const createObjectMutation = useCreateObjectusObject();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const object: IObjectObjectus = {
      id: 0,
      name: nameObject,
      description: descriptionObject,
    };

    createObjectMutation.mutate(object);
  };
  return (
    <>
      <Form onSubmit={handleSubmit} className={style.login_form}>
        <h2 className="p-2 mb-3">Создание объекта</h2>
        <Form.Group className="text-start mb-3" controlId="formBasicEmail">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            placeholder="Имя объекта"
            disabled={createObjectMutation.isPending}
            onChange={(e) => setNameObject(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="text-start mb-4" controlId="formBasicEmail">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="text"
            placeholder="Описание объекта"
            disabled={createObjectMutation.isPending}
            onChange={(e) => SetDescriptionObject(e.target.value)}
          />
        </Form.Group>
        {!createObjectMutation.isPending ? (
          <Button className="btn btn-primary" type="submit" variant="primary">
            Создать
          </Button>
        ) : (
          <Button className="btn btn-primary" variant="primary" disabled>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            &nbsp;Создаем
          </Button>
        )}
      </Form>
    </>
  );
};
