import React from 'react';
import { Outlet,Link } from "react-router-dom";
import { x } from '@xstyled/styled-components'



// const Home = () => {
//     return (
//         <nav>
//             <p>
//             Edit <code>src/App.js</code> and save to reload.
//             </p>
//             <x.div display="grid" gap={4} gridTemplateColumns={2} pt={8}>
//                 <Link to="/">Home</Link>
//                 <Link to="/contact">Contact</Link>
//                 <div>4</div>
//             </x.div>
//         </nav>
//     );
//   };
  
//   export default Home;

const Layout = () => {
  return (
    <>
      <nav>
      <p>Edit <code>src/App.js</code> and save to reload.</p>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;