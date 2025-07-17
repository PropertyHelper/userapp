import {createBrowserRouter, RouterProvider} from 'react-router-dom';

//Pages
import { Onboard } from './Pages/Onboard.jsx';
import { Login } from './Pages/Login.jsx';
import { Home } from './Pages/Home.jsx';
import { Register } from './Pages/Register.jsx';
import { NotFound } from './Pages/NotFound.jsx';


//Routing to pages
const router = createBrowserRouter([{
    path: '/',
    element: <Onboard/>,
    errorElement: <NotFound/>,
    },
    {
      path: '/user/login',
      element: <Login/>,
    },
    {
        path: '/register',
        element: <Register/>,
    },
    {
        path: '/user',
        element: <Home/>,
    }])

export default function App() {
    return (
        <RouterProvider router={router}/>
    )
}


