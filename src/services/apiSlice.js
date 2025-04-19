import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from 'src/constants'

export const apiSlice = createApi({
    reducerPath: 'devTinderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
    }),
    endpoints: (build) => ({
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
    }),
})

export const { useGetUserFeedQuery, useGetUserProfileQuery, useSignInMutation, useSignOutMutation } = apiSlice
