import { apiSlice } from 'services/apiSlice'

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (credentials) => ({
                url: '/auth/signin',
                method: 'POST',
                body: credentials,
            }),
        }),
        signOut: builder.mutation({
            query: () => ({
                url: '/auth/signout',
                method: 'POST',
            }),
        }),
    }),
})

export const { useSignInMutation, useSignOutMutation } = authApi
