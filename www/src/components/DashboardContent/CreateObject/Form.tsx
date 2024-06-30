import { useState } from 'react';
import { Button, Container, Form, Row, Spinner } from 'react-bootstrap';
import { IObjectObjectus, useCreateObjectusObject } from '../../../services/Objectus';

import style from './Form.module.css';
import { toastError, toastSuccess, toastWarning } from '../../../services/NotifycationService';
import { AxiosError } from 'axios';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../../routes/AppRoutes';

export const CreateObject = () => {
  const [nameObject, setNameObject] = useState<string>('');
  const [descriptionObject, SetDescriptionObject] = useState<string>('');
  const createObjectMutation = useCreateObjectusObject();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (nameObject.length > 4) {
      const object: IObjectObjectus = {
        id: 0,
        name: nameObject,
        description: descriptionObject,
      };

      createObjectMutation.mutate(object);
    } else {
      toastWarning('Имя объекта должно состоять минимум из 5 символов ');
    }
  };

  if (createObjectMutation.isError) {
    const statusCode: number | undefined = (createObjectMutation.error as AxiosError).response?.status;
    if (statusCode === 409) {
      toastSuccess(`Объект "${nameObject}" создан`);
      toastWarning(`Объект с именем "${nameObject}" уже существует`);
    } else {
      toastError('Произошла ошибка, попробуйте позже');
    }
  }

  if (createObjectMutation.isSuccess) return <Navigate to={AppRoutes.USER_PROFILE.home} replace />;

  return (
    <>
      <h1 className="p-2 mb-3 text-start">Создание объекта</h1>
      <Container>
        <Row className="col-sm-12 col-md-6 mx-auto">
          <Form onSubmit={handleSubmit} className={style.create_object_form}>
            <Form.Group className="text-start mb-3" controlId="formName">
              <Form.Label>Имя объекта</Form.Label>
              <Form.Control
                type="text"
                placeholder="Имя объекта"
                disabled={createObjectMutation.isPending}
                onChange={(e) => setNameObject(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="text-start mb-4" controlId="formDescription">
              <Form.Label>Описание объекта</Form.Label>
              <Form.Control
                type="text"
                placeholder="Описание объекта(Не обязательное поле)"
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
                &nbsp;Запрос на сервер
              </Button>
            )}
          </Form>
        </Row>
      </Container>
    </>
  );
};
