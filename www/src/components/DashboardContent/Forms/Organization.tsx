import { useState } from 'react';
import { Button, Container, Form, Row, Spinner } from 'react-bootstrap';
import { IOrganizationObjectus, useCreateOrganizationObject } from '../../../services/Objectus';

import style from './Form.module.css';
import { toastError, toastSuccess, toastWarning } from '../../../services/NotifycationService';
import { AxiosError } from 'axios';
/*import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../../routes/AppRoutes';*/

export const CreateOrganization = () => {
  const [nameOrganization, setNameOrganization] = useState<string>('');
  const [addressOrganization, setAddressOrganization] = useState<string>('');
  const [innOrganization, setInnOrganization] = useState<string>('');
  const [supervisorOrganization, setSupervisorOrganization] = useState<string>('');
  const [descriptionOrganization, SetDescriptionOrganization] = useState<string>('');
  const createOrganizationMutation = useCreateOrganizationObject();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (nameOrganization.length > 4) {
      const organization: IOrganizationObjectus = {
        id: 0,
        name: nameOrganization,
        address: addressOrganization,
        inn: innOrganization,
        supervisor: supervisorOrganization, 
        description: descriptionOrganization,
        isActive: true
      };

      createOrganizationMutation.mutate(organization);
    } else {
      toastWarning('Имя объекта должно состоять минимум из 5 символов ');
    }
  };


  if (createOrganizationMutation.isError) {
    const statusCode: number | undefined = (createOrganizationMutation.error as AxiosError).response?.status;
    if (statusCode === 409) {
      toastSuccess(`Организация "${nameOrganization}" зарегистрированна`);
      toastWarning(`Организация с именем "${nameOrganization}" уже зарегистрированна`);
    } else {
      toastError('Произошла ошибка, попробуйте позже');
    }
  }

  /*if (createOrganizationMutation.isSuccess) return <Navigate to={AppRoutes.USER_PROFILE.home} replace />;*/

  return (
    <>
      <h1 className="p-2 mb-3 text-start">Регистрация организации</h1>
      <Container>
        <Row className="col-sm-12 col-md-6 mx-auto">
          <Form onSubmit={handleSubmit} className={style.create_organization_form}>
            <Form.Group className="text-start mb-3" controlId="formName">
              <Form.Label>Наименование организации</Form.Label>
              <Form.Control
                type="text"
                placeholder="Наименование организации"
                disabled={createOrganizationMutation.isPending}
                onChange={(e) => setNameOrganization(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="text-start mb-3" controlId="formAddress">
              <Form.Label>Адрес организации</Form.Label>
              <Form.Control
                type="text"
                placeholder="Адрес организации"
                disabled={createOrganizationMutation.isPending}
                onChange={(e) => setAddressOrganization(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="text-start mb-3" controlId="formInn">
              <Form.Label>ИНН компании</Form.Label>
              <Form.Control
                type="text"
                placeholder="ИНН компании"
                disabled={createOrganizationMutation.isPending}
                onChange={(e) => setInnOrganization(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="text-start mb-3" controlId="formSupervisor">
              <Form.Label>ФИО ответственного лица</Form.Label>
              <Form.Control
                type="text"
                placeholder="ФИО ответственного лица"
                disabled={createOrganizationMutation.isPending}
                onChange={(e) => setSupervisorOrganization(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="text-start mb-4" controlId="formDescription">
              <Form.Label>Описание организации</Form.Label>
              <Form.Control
                type="text"
                placeholder="Описание организации(Не обязательное поле)"
                disabled={createOrganizationMutation.isPending}
                onChange={(e) => SetDescriptionOrganization(e.target.value)}
              />
            </Form.Group>
            {!createOrganizationMutation.isPending ? (
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