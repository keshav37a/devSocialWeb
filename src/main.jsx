import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { store } from './store'

import { SignIn } from '@Auth'
import { Body } from '@CoreUI'
import { Feed } from '@Feed'
import { Profile } from '@Profile'

import './styles.css'

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
            {
                path: '/feed',
                element: <Feed />,
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
