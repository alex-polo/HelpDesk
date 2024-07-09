import { Container, Spinner } from 'react-bootstrap';

const SidebarSpinner = () => {
  return (
    <>
      <Container className="load-spinner">
        <Spinner animation="border" variant="light" />
      </Container>
    </>
  );
};

export default SidebarSpinner;
