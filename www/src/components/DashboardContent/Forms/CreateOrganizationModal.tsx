import { useState } from 'react';
import { Button, Container, Form, Row, Spinner, Modal } from 'react-bootstrap';
import { IOrganizationObjectus, useCreateOrganizationObject } from '../../../services/Objectus';

import { toastError, toastSuccess, toastWarning } from '../../../services/NotifycationService';
import { AxiosError } from 'axios';

export const CreateOrganizationFormModal = () => {
  const [nameOrganization, setNameOrganization] = useState<string>('');
  const [shortNameOrganization, setShortNameOrganization] = useState<string>('');
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
        short_name: shortNameOrganization,
        address: addressOrganization,
        inn: Number(innOrganization),
        supervisor: supervisorOrganization,
        description: descriptionOrganization,
        isActive: true,
      };

      createOrganizationMutation.mutate(organization);
    } else {
      toastWarning('Имя объекта должно состоять минимум из 5 символов ');
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <Button variant="primary" onClick={handleShow}>
        Изменить компанию
      </Button>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <h1 className="p-2 mb-3 text-start">Регистрация организации</h1>
        </Modal.Header>
        <Modal.Body>
          <Row className="col-sm-12 col-md-6 mx-auto">
            {/* <Form onSubmit={handleSubmit} className={style.create_organization_form}> */}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="text-start mb-3" controlId="formName">
                <Form.Label>Наименование организации</Form.Label>
                <Form.Control
                  type="text"
                  value={nameOrganization}
                  placeholder="Наименование организации"
                  disabled={createOrganizationMutation.isPending}
                  onChange={(e) => setNameOrganization(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="text-start mb-3" controlId="formShortName">
              <Form.Label>Краткое наименование организации</Form.Label>
              <Form.Control
                type="text"
                placeholder="Краткое наименование организации"
                disabled={createOrganizationMutation.isPending}
                onChange={(e) => setShortNameOrganization(e.target.value)}
              />
            </Form.Group>
              <Form.Group className="text-start mb-3" controlId="formAddress">
                <Form.Label>Адрес организации</Form.Label>
                <Form.Control
                  type="text"
                  value={addressOrganization}
                  placeholder="Адрес организации"
                  disabled={createOrganizationMutation.isPending}
                  onChange={(e) => setAddressOrganization(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="text-start mb-3" controlId="formInn">
                <Form.Label>ИНН компании</Form.Label>
                <Form.Control
                  type="text"
                  value={innOrganization}
                  placeholder="ИНН компании"
                  disabled={createOrganizationMutation.isPending}
                  onChange={(e) => setInnOrganization(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="text-start mb-3" controlId="formSupervisor">
                <Form.Label>ФИО ответственного лица</Form.Label>
                <Form.Control
                  type="text"
                  value={supervisorOrganization}
                  placeholder="ФИО ответственного лица"
                  disabled={createOrganizationMutation.isPending}
                  onChange={(e) => setSupervisorOrganization(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="text-start mb-4" controlId="formDescription">
                <Form.Label>Описание организации</Form.Label>
                <Form.Control
                  type="text"
                  value={descriptionOrganization}
                  placeholder="Описание организации(Не обязательное поле)"
                  disabled={createOrganizationMutation.isPending}
                  onChange={(e) => SetDescriptionOrganization(e.target.value)}
                />
              </Form.Group>

                {!createOrganizationMutation.isPending ? (
                  <Button className="btn btn-primary" type="submit" variant="primary">
                    Создать/сохранить изменения
                  </Button>
                ) : (
                  <Button className="btn btn-primary" variant="primary" disabled>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    &nbsp;Запрос на сервер
                  </Button>
                
              )}
            </Form>
          </Row>
          </Modal.Body>
      </Modal>
    </>
  );
};
