import { ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import NavBar from '../navbar';
import Sidebar from '../sidebar';
import { useAuth } from '../../context/AuthProvider';
import { Spinner } from 'react-bootstrap';

type Props = {};

export const Dashboard = (props: Props): ReactElement => {
  const { getUserInfo } = useAuth();
  const queryUserInfo = useQuery({ queryKey: ['userInfo'], queryFn: getUserInfo });

  if (queryUserInfo.isLoading) {
    return (
      <>
        <Spinner animation="grow" variant="primary" />
      </>
    );
  } else {
    return (
      <>
        <Sidebar />
        <div className="main">
          <NavBar username={queryUserInfo.isSuccess ? queryUserInfo.data?.email : 'undefined'} />
          <main>
            <div></div>
          </main>
        </div>
      </>
    );
  }
};
