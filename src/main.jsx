import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { store } from './store'

import { SignIn } from '@Auth'
import { Connections } from '@Connections'
import { Body, Toast } from '@CoreUI'
import { Feed } from '@Feed'
import { Profile } from '@Profile'

import './styles.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Body />,
        children: [
            {
                path: '/feed',
                element: <Feed />,
            },
            {
                path: '/connections',
                element: <Connections />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/signin',
                element: <SignIn />,
            },
        ],
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <Toast>
                <RouterProvider router={router} />
            </Toast>
        </Provider>
    </StrictMode>
)
