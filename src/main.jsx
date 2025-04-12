import SignIn from '@Auth/SignIn.jsx';
import Body from '@CoreUI/Body.jsx';
import Profile from '@Profile/Profile.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { store } from './store.js';
import './styles.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Body />,
        children: [
            {
                path: '/signin',
                element: <SignIn />,
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
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
