import { useParams } from 'react-router-dom';

export const ObjectAppeals = () => {
  const { objectName } = useParams();
  return (
    <>
      <h1>Appeals</h1>
      <h2>{objectName}</h2>
    </>
  );
};
