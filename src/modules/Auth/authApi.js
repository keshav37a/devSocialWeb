import { signInUser, signOutUser } from './authSlice'

import { showToast, TOAST_TYPES } from '@CoreUI/coreUISlice'
import { apiSlice } from 'services/apiSlice'

import { GET_USER_CONNECTION_REQUESTS_TAG, GET_USER_CONNECTIONS_TAG } from '@Connections/connectionsApi'
import { GET_USER_FEED_TAG } from '@Feed/feedApi'

import { deleteCookie } from 'src/utils'

export const SIGNIN_TAG = 'SIGN_IN'

export const SIGNIN_ENDPOINT = 'signIn'
export const SIGNOUT_ENDPOINT = 'signOut'
export const SIGNUP_ENDPOINT = 'signUp'

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        [SIGNIN_ENDPOINT]: builder.mutation({
            query: (credentials) => ({
                url: '/auth/signin',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    dispatch(signInUser(data?.data?.data?.user))
                    dispatch(showToast({ content: 'Signed in successfuly', type: TOAST_TYPES.SUCCESS }))
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                }
            },
            providesTags: [SIGNIN_TAG],
            invalidatesTags: [
                GET_USER_FEED_TAG,
                GET_USER_CONNECTIONS_TAG,
                GET_USER_CONNECTION_REQUESTS_TAG,
                SIGNIN_TAG,
            ],
        }),
        [SIGNOUT_ENDPOINT]: builder.mutation({
            query: () => ({
                url: '/auth/signout',
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    deleteCookie('token')
                    await queryFulfilled
                    dispatch(signOutUser())
                    dispatch(showToast({ content: 'Signed out successfuly', type: TOAST_TYPES.SUCCESS }))
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                }
            },
        }),
        [SIGNUP_ENDPOINT]: builder.mutation({
            query: (userData) => ({
                url: '/auth/signup',
                method: 'POST',
                body: userData,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(showToast({ content: 'User signed up successfuly', type: TOAST_TYPES.SUCCESS }))
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                }
            },
            invalidatesTags: [
                GET_USER_FEED_TAG,
                GET_USER_CONNECTIONS_TAG,
                GET_USER_CONNECTION_REQUESTS_TAG,
                SIGNIN_TAG,
            ],
        }),
    }),
})

export const { useSignInMutation, useSignOutMutation, useSignUpMutation } = authApi
