import { showToast, TOAST_TYPES } from '@CoreUI/coreUISlice'
import { apiSlice } from 'services/apiSlice'

import { GET_USER_FEED_TAG } from '@Feed/feedApi'

export const GET_USER_CONNECTIONS_ENDPOINT = 'getUserConnections'
export const GET_USER_CONNECTION_REQUESTS_ENDPOINT = 'getUserConnectionRequests'
export const REMOVE_CONNECTION_ENDPOINT = 'removeConnection'
export const REVIEW_CONNECTION_REQUEST_ENDPOINT = 'reviewConnectionRequest'
export const SEND_CONNECTION_REQUEST_ENDPOINT = 'sendConnectionRequest'

export const GET_USER_CONNECTIONS_TAG = 'GET_USER_CONNECTIONS'
export const GET_USER_CONNECTION_REQUESTS_TAG = 'GET_USER_CONNECTION_REQUESTS'

export const connectionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        [GET_USER_CONNECTIONS_ENDPOINT]: builder.query({
            query: () => ({
                url: '/connection-request/connections',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                }
            },
            providesTags: [GET_USER_CONNECTIONS_TAG],
            transformResponse: (response) => response?.data?.connections,
        }),
        [GET_USER_CONNECTION_REQUESTS_ENDPOINT]: builder.query({
            query: () => ({
                url: '/connection-request/review-requests',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                }
            },
            providesTags: [GET_USER_CONNECTION_REQUESTS_TAG],
            transformResponse: (response) => response?.data?.connectionRequests,
        }),
        [REMOVE_CONNECTION_ENDPOINT]: builder.mutation({
            query: ({ userId }) => ({
                url: `connection-request/connection/remove/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [GET_USER_FEED_TAG],
            async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
                let patchResult
                try {
                    patchResult = dispatch(
                        apiSlice.util.updateQueryData(GET_USER_CONNECTIONS_ENDPOINT, null, (draft) =>
                            draft.filter((user) => user._id !== userId)
                        )
                    )
                    await queryFulfilled
                    dispatch(showToast({ content: 'Connection removed successfully', type: TOAST_TYPES.SUCCESS }))
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                    patchResult.undo()
                }
            },
        }),
        [REVIEW_CONNECTION_REQUEST_ENDPOINT]: builder.mutation({
            query: ({ status, connectionRequestId }) => ({
                url: `connection-request/review/${status}/${connectionRequestId}`,
                method: 'POST',
            }),
            invalidatesTags: [GET_USER_CONNECTIONS_TAG],
            async onQueryStarted({ connectionRequestId }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getUserConnectionRequests', null, (draft) =>
                        draft.filter((connectionRequest) => connectionRequest?._id !== connectionRequestId)
                    )
                )
                try {
                    await queryFulfilled
                    //TODO: diff messages for accept / ignore
                    dispatch(
                        showToast({ content: 'Connection request reviewed successfully', type: TOAST_TYPES.SUCCESS })
                    )
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                    patchResult.undo()
                }
            },
        }),
        [SEND_CONNECTION_REQUEST_ENDPOINT]: builder.mutation({
            query: ({ status, userId }) => ({
                url: `connection-request/send/${status}/${userId}`,
                method: 'POST',
            }),
            async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getUserFeed', null, (draft) =>
                        draft.filter((user) => user?._id !== userId)
                    )
                )
                try {
                    await queryFulfilled
                    dispatch(showToast({ content: 'Connection request sent successfully', type: TOAST_TYPES.SUCCESS }))
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                    patchResult.undo()
                }
            },
            transformResponse: (response) => response?.data,
        }),
    }),
})

export const {
    useGetUserConnectionsQuery,
    useGetUserConnectionRequestsQuery,
    useRemoveConnectionMutation,
    useReviewConnectionRequestMutation,
    useSendConnectionRequestMutation,
} = connectionsApi
