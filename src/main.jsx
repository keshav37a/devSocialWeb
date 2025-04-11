import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';
import Body from './components/Body.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import './styles.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Body />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
