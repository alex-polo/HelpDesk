import { Breadcrumb, Button, Card, Container } from 'react-bootstrap';

import style from './mainContent.module.css';
import { ReactElement } from 'react';

export const MainContent = (): ReactElement => {
  return (
    <>
      <main className={style.content}>
        {/* <Breadcrumb>
          <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">Объект</Breadcrumb.Item>
          <Breadcrumb.Item active>Суб объект</Breadcrumb.Item>
        </Breadcrumb> */}
        <Container fluid>
          <h3>Добро пожаловать</h3>
          <Card className={style.main_content_card_welcome}>
            <Card.Body className="mt-2">
              {/* <Card.Title>Добро пожаловать</Card.Title> */}
              <Card.Text>У вас еще нет объектов</Card.Text>
              <Button variant="primary">Добавить объект</Button>
            </Card.Body>
          </Card>
          {/* <Button className="btn btn-primary btn-sm">Primary</Button>
          <Button className="btn btn-secondary">Secondary</Button>
          <Button className="btn btn-success">Success</Button>
          <Button className="btn btn-danger">Danger</Button>
          <Button className="btn btn-warning">Warning</Button>
          <Button className="btn btn-info btn-sm">Info</Button> */}
        </Container>
      </main>
    </>
  );
};
