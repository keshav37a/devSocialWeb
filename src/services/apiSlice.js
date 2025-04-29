import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from 'src/constants'

export const apiSlice = createApi({
    reducerPath: 'devTinderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
    }),
    endpoints: (build) => ({
        editUserProfile: build.mutation({
            query: (updatedUserProfile) => ({
                url: '/profile/edit',
                method: 'PATCH',
                body: updatedUserProfile,
            }),
        }),
        getUserConnections: build.query({
            query: () => ({
                url: '/connection-request/connections',
            }),
        }),
        getUserConnectionRequests: build.query({
            query: () => ({
                url: '/connection-request/review-requests',
            }),
        }),
        getUserFeed: build.query({
            query: () => ({
                url: '/user/feed',
            }),
        }),
        getUserProfile: build.query({
            query: () => ({
                url: '/profile/view',
            }),
        }),
        signIn: build.mutation({
            query: (credentials) => ({
                url: '/auth/signin',
                method: 'POST',
                body: credentials,
            }),
        }),
        signOut: build.mutation({
            query: () => ({
                url: '/auth/signout',
                method: 'POST',
            }),
        }),
    }),
})

export const {
    useEditUserProfileMutation,
    useGetUserConnectionsQuery,
    useGetUserConnectionRequestsQuery,
    useGetUserFeedQuery,
    useGetUserProfileQuery,
    useSignInMutation,
    useSignOutMutation,
} = apiSlice
