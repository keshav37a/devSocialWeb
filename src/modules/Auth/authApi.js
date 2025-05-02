import { apiSlice } from 'services/apiSlice'

import { GET_USER_CONNECTION_REQUESTS_TAG, GET_USER_CONNECTIONS_TAG } from '@Connections/connectionsApi'
import { GET_USER_FEED_TAG } from '@Feed/feedApi'

export const SIGNIN_TAG = 'SIGN_IN'
export const SIGNIN_ENDPOINT = 'signIn'
export const SIGNOUT_ENDPOINT = 'signOut'

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        [SIGNIN_ENDPOINT]: builder.mutation({
            query: (credentials) => ({
                url: '/auth/signin',
                method: 'POST',
                body: credentials,
            }),
            providesTags: [SIGNIN_TAG],
        }),
        [SIGNOUT_ENDPOINT]: builder.mutation({
            query: () => ({
                url: '/auth/signout',
                method: 'POST',
            }),
            invalidatesTags: [
                GET_USER_FEED_TAG,
                GET_USER_CONNECTIONS_TAG,
                GET_USER_CONNECTION_REQUESTS_TAG,
                SIGNIN_TAG,
            ],
        }),
    }),
})

export const { useSignInMutation, useSignOutMutation } = authApi
