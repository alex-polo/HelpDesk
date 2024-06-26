import { useEffect, useState } from 'react';
import { useLocation, useMatches } from 'react-router-dom';

export const Breadcrumbs: React.FC = () => {
  let matches = useMatches();

  // let crumbs = matches
  //   // first get rid of any matches that don't have handle and crumb
  //   .filter((match) => Boolean(match.handle?.crumb))
  //   // now map them into an array of elements, passing the loader
  //   // data to each one
  //   .map((match) => match.handle.crumb(match.data));

  // return (
  //   <ol>
  //     {crumbs.map((crumb, index) => (
  //       <li key={index}>{crumb}</li>
  //     ))}
  //   </ol>
  // );
  return <nav></nav>;
};

// export const Breadcrumbs: React.FC = () => {
//   //   const { state } = useLocation<IBreadcrumbsLocationState[]>();
//   const location = useLocation();
//   const [crumbs, setCrumbs] = useState<string[]>([]);

//   useEffect(() => {
//     // Google Analytics
//     // ga('send', 'pageview');
//     // const crumbs = location.pathname
//     //   .split('/')
//     //   .filter((crumb) => crumb !== '')
//     //   .map((crumb) => {
//     //     console.log(`/${crumb}`);
//     //   });
//     setCrumbs(location.pathname.split('/').filter((crumb) => crumb !== ''));
//   }, [location]);

//   //   {
//   //     crumbs?.map((crumb) => (
//   //       <li key={crumb.id}>
//   //         <a className={style.sidebar_link}>
//   //           <span>{objectusObject.name}</span>
//   //         </a>
//   //       </li>
//   //     ));
//   //   }

//   return <nav>{crumbs}</nav>;
// };
