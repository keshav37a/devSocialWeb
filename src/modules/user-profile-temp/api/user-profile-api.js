/* eslint-disable import/order */
import { showToast } from 'src/modules/layout-temp/api/layout-slice'
import { apiSlice } from 'services/api-slice'

import { EDIT_USER_PROFILE_ENDPOINT, GET_USER_PROFILE_ENDPOINT } from 'src/modules/user-profile-temp/constants/user-profile-constants'
import { TOAST_TYPES } from 'src/modules/components-temp/Toast/constants'

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
