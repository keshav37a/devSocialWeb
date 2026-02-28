import { TOAST_TYPES } from 'src/modules/components-temp/Toast/constants'

import { signInUser, signOutUser } from 'src/modules/auth-temp/api/auth-slice'
import { showToast } from 'src/modules/layout-temp/api/layout-slice'
import { apiSlice } from 'services/api-slice'

import { deleteCookie } from 'src/utils'

import {
    FORGOT_PASSWORD_ENDPOINT,
    RESET_PASSWORD_ENDPOINT,
    SIGNIN_ENDPOINT,
    SIGNIN_TAG,
    SIGNIN_GOOGLE_ENDPOINT,
    SIGNOUT_ENDPOINT,
    SIGNUP_ENDPOINT,
} from 'src/modules/auth-temp/constants/auth-constants'
import {
    GET_USER_CONNECTION_REQUESTS_TAG,
    GET_USER_CONNECTIONS_TAG,
} from 'src/modules/connections-temp/constants/connections-constants'
import { GET_USER_FEED_TAG } from 'src/modules/feed-temp/constants/feed-constants'

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        [FORGOT_PASSWORD_ENDPOINT]: builder.mutation({
            query: (email) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: email,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(showToast({ content: 'Email otp sent successfully', type: TOAST_TYPES.SUCCESS }))
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                }
            },
        }),
        [RESET_PASSWORD_ENDPOINT]: builder.mutation({
            query: (params) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: params,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(showToast({ content: 'Password reset successfully', type: TOAST_TYPES.SUCCESS }))
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                }
            },
        }),
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
        [SIGNIN_GOOGLE_ENDPOINT]: builder.mutation({
            query: (token) => ({
                url: '/auth/signin-google',
                method: 'POST',
                body: token,
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

export const {
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useSignInMutation,
    useSignInGoogleMutation,
    useSignOutMutation,
    useSignUpMutation,
} = authApi
