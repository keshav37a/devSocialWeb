import { apiSlice } from 'services/apiSlice'

export const userProfileApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        editUserProfile: builder.mutation({
            query: (updatedUserProfile) => ({
                url: '/profile/edit',
                method: 'PATCH',
                body: updatedUserProfile,
            }),
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: '/profile/view',
            }),
        }),
    }),
})

export const { useEditUserProfileMutation, useGetUserProfileQuery } = userProfileApi
