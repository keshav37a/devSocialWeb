import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router'

import { store } from './store'

import { Auth } from '@Auth'
import { ConnectionRequests, Connections } from '@Connections'
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
                path: '/connections',
                element: <Connections />,
            },
            {
                path: '/connection-requests',
                element: <ConnectionRequests />,
            },
            {
                path: '/feed',
                element: <Feed />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/auth',
                element: <Auth />,
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
