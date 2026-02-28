import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router'

import { SuspenseWrapper, Toast } from '@components'
import { Body, ErrorBoundary } from '@layout/components'

const Auth = lazy(() => import('@auth'))
const Connections = lazy(() => import('@connections'))
const ConnectionRequests = lazy(() => import('@connection-requests'))
const Feed = lazy(() => import('@feed'))
const UserProfile = lazy(() => import('@user-profile'))

import { store } from './store'

import { getCookieValue } from 'src/utils'

import { ROUTES } from './constants'

import './styles.css'

// Protected routes that require authentication
const PROTECTED_ROUTES = [ROUTES.FEED, ROUTES.CONNECTIONS, ROUTES.CONNECTION_REQUESTS, ROUTES.PROFILE]

// Authentication loader
const authLoader = () => {
    const token = getCookieValue('token')
    if (!token) {
        return redirect(ROUTES.AUTH)
    }
    return null
}

// Public route loader (redirects authenticated users)
const publicLoader = () => {
    const token = getCookieValue('token')
    if (token) {
        return redirect(ROUTES.FEED)
    }
    return null
}

const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Body />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <div>Welcome to DevSocial!</div>,
                handle: { title: 'DevSocial - Home' },
            },
            {
                path: ROUTES.FEED,
                element: (
                    <SuspenseWrapper>
                        <Feed />
                    </SuspenseWrapper>
                ),
                loader: authLoader,
                handle: { title: 'DevSocial - Feed' },
            },
            {
                path: ROUTES.CONNECTIONS,
                element: (
                    <SuspenseWrapper>
                        <Connections />
                    </SuspenseWrapper>
                ),
                loader: authLoader,
                handle: { title: 'DevSocial - Connections' },
            },
            {
                path: ROUTES.CONNECTION_REQUESTS,
                element: (
                    <SuspenseWrapper>
                        <ConnectionRequests />
                    </SuspenseWrapper>
                ),
                loader: authLoader,
                handle: { title: 'DevSocial - Connection Requests' },
            },
            {
                path: ROUTES.PROFILE,
                element: (
                    <SuspenseWrapper>
                        <UserProfile />
                    </SuspenseWrapper>
                ),
                loader: authLoader,
                handle: { title: 'DevSocial - Profile' },
            },
            {
                path: ROUTES.AUTH,
                element: (
                    <SuspenseWrapper>
                        <Auth />
                    </SuspenseWrapper>
                ),
                loader: publicLoader,
                handle: { title: 'DevSocial - Sign In' },
            },
        ],
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Provider store={store}>
                <Toast>
                    <RouterProvider router={router} />
                </Toast>
            </Provider>
        </GoogleOAuthProvider>
    </StrictMode>
)
