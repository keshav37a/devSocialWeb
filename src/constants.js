export const BASE_URL = import.meta.env.VITE_BE_BASE_URL

export const ROUTES = {
    HOME: '/',
    FEED: '/feed',
    CONNECTIONS: '/connections',
    CONNECTION_REQUESTS: '/connection-requests',
    PROFILE: '/profile',
    AUTH: '/auth',
}

export const GENDER_OPTIONS = [
    {
        displayName: 'Male',
        value: 'male',
    },
    {
        displayName: 'Female',
        value: 'female',
    },
    {
        displayName: 'Other',
        value: 'other',
    },
]
