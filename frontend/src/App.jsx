import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import * as sessionActions from './store/session';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupFormPage from './components/SignupFormPage/SignupFormPage';


function Layout(){
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false); //slice of state that checks if user has been loaded

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(()=>{
      setIsLoaded(true) //sets isLoaded to true
    });
  }, [dispatch]); //depends on change of dispatch

  return (
    <>
    {isLoaded && <Outlet />}
    </>
  );
}



const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [

      {
        path: '/',
        element: <h1>Welcome to Janbnb!</h1>
      },
      {
        path: '/login',
        element: <LoginFormPage />
      },
      {
        path: '/signup',
        element: <SignupFormPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
