import { ReactElement } from 'react';

import style from './sidebarMenu.module.css';
import { useQuery } from '@tanstack/react-query';

export const SidebarMenu = (): ReactElement => {
  // const { isPending, error, data } = useQuery({
  //   queryKey: ['getObjects'],
  //   queryFn: () => fetch('https://api.github.com/repos/TanStack/query').then((res) => res.json()),
  // });
  // if (isPending) return <>'Loading...'</>;
  // if (error) return <>error</>;
  // console.log(111);
  // console.log(data);
  return (
    <>
      <span className={style.sidebar_header}>Мои объекты</span>
      {/* <ul>
        {data?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul> */}
      {/* <a href="111">Создать объект</a> */}
      {/* <Nav.Link onClick={handlerClick}>1111111</Nav.Link>
          <Nav.Link href="/#">Объект 1</Nav.Link>
          <Nav.Link href="/#">+ Добавить Объект</Nav.Link> */}
      {/* <Nav.Link eventKey="link-1">Link</Nav.Link>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link> */}
    </>
  );
};
