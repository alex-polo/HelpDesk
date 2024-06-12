import NavBar from '../navbar';
import Sidebar from '../sidebar';

type Props = {};

export const Dashboard = (props: Props) => {
  return (
    <>
      <Sidebar />
      <div className="main">
        <NavBar />
        <main>
          <div></div>
        </main>
      </div>
    </>
  );
};
