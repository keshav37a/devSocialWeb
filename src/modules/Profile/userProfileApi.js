import { apiSlice } from 'services/apiSlice'

export const EDIT_USER_PROFILE_ENDPOINT = 'editUserProfile'
export const GET_USER_PROFILE_ENDPOINT = 'getUserProfile'

export const userProfileApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        [EDIT_USER_PROFILE_ENDPOINT]: builder.mutation({
            query: (updatedUserProfile) => ({
                url: '/profile/edit',
                method: 'PATCH',
                body: updatedUserProfile,
            }),
        }),
        [GET_USER_PROFILE_ENDPOINT]: builder.query({
            query: () => ({
                url: '/profile/view',
            }),
        }),
    }),
})

export const { useEditUserProfileMutation, useGetUserProfileQuery } = userProfileApi
