import { useParams } from 'react-router-dom';
import TgUsersTable from './TgUsersTable';
import { Container, Row } from 'react-bootstrap';

export const ObjectSettings = () => {
  const params = useParams();
  const objectName: string | undefined = params.objectName;

  return (
    <>
      <Container></Container>

      <Row>
        <h1>Настройки</h1>
      </Row>
      <Row>
        <h2>Подситемы</h2>
        <TgUsersTable objectName={objectName ? objectName : 'nothing'} />
      </Row>
      <Row>
        <h2>Telegram пользователи</h2>
        <TgUsersTable objectName={objectName ? objectName : 'nothing'} />
      </Row>
    </>
  );
};
