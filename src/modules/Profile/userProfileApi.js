import { showToast, TOAST_TYPES } from '@CoreUI/coreUISlice'
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
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(showToast({ content: 'User profile updated successfully', type: TOAST_TYPES.SUCCESS }))
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                }
            },
        }),
        [GET_USER_PROFILE_ENDPOINT]: builder.query({
            query: () => ({
                url: '/profile/view',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                }
            },
        }),
    }),
})

export const { useEditUserProfileMutation, useGetUserProfileQuery } = userProfileApi
