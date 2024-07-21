import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import * as sessionActions from './store/session';
// import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import Navigation from './components/Navigation/Navigation';
import Splash from './components/Spash/Spash';
import SpotDetails from './components/SpotDetails/SpotDetails';
import SpotForm from './components/SpotForm/SpotForm';
import ManageSpots from './components/ManageSpots/ManageSpots';
import UpdateForm from './components/UpdateForm/UpdateForm';


function Layout(){ //this puts it all together...
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false); //slice of state that checks if user has been loaded

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(()=>{
      setIsLoaded(true) //sets isLoaded to true
    });
  }, [dispatch]); //depends on change of dispatch

  return (
    //always renders Navigation,
    //pass isLoaded as a prop so that Navigation component can use it
    //checks if user isLoaded before rendering children (Outlet)
    <>
      <header>
        <Navigation isLoaded={isLoaded} />
      </header>

      <main>
        {isLoaded && <Outlet />}
      </main>
    </>
  );
}



const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Splash />
      },
      {
        path: '/spots/:id',
        element: <SpotDetails />
      },
      {
        path: '/newspot',
        element: <SpotForm />
      },
      {
        path: '/managespots',
        element: <ManageSpots />
      },
      {
        path: '/update/:id',
        element: <UpdateForm />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
