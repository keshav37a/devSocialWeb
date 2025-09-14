import { lazy, StrictMode, Suspense } from 'react'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router'

import { store } from './store'

import { Body, ErrorBoundary, Loading, Toast } from '@CoreUI'

import { getCookieValue } from 'src/utils'

import './styles.css'

// Lazy load components for better performance
const Auth = lazy(() => import('@Auth').then((module) => ({ default: module.Auth })))
const Connections = lazy(() => import('@Connections').then((module) => ({ default: module.Connections })))
const ConnectionRequests = lazy(() => import('@Connections').then((module) => ({ default: module.ConnectionRequests })))
const Feed = lazy(() => import('@Feed').then((module) => ({ default: module.Feed })))
const Profile = lazy(() => import('@Profile').then((module) => ({ default: module.Profile })))

// Route constants for better maintainability
export const ROUTES = {
    HOME: '/',
    FEED: '/feed',
    CONNECTIONS: '/connections',
    CONNECTION_REQUESTS: '/connection-requests',
    PROFILE: '/profile',
    AUTH: '/auth',
}

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
                    <Suspense fallback={<Loading isLoading />}>
                        <Feed />
                    </Suspense>
                ),
                loader: authLoader,
                handle: { title: 'DevSocial - Feed' },
            },
            {
                path: ROUTES.CONNECTIONS,
                element: (
                    <Suspense fallback={<Loading isLoading />}>
                        <Connections />
                    </Suspense>
                ),
                loader: authLoader,
                handle: { title: 'DevSocial - Connections' },
            },
            {
                path: ROUTES.CONNECTION_REQUESTS,
                element: (
                    <Suspense fallback={<Loading isLoading />}>
                        <ConnectionRequests />
                    </Suspense>
                ),
                loader: authLoader,
                handle: { title: 'DevSocial - Connection Requests' },
            },
            {
                path: ROUTES.PROFILE,
                element: (
                    <Suspense fallback={<Loading isLoading />}>
                        <Profile />
                    </Suspense>
                ),
                loader: authLoader,
                handle: { title: 'DevSocial - Profile' },
            },
            {
                path: ROUTES.AUTH,
                element: (
                    <Suspense fallback={<Loading isLoading />}>
                        <Auth />
                    </Suspense>
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
