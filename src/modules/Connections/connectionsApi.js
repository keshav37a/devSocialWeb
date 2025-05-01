import { apiSlice } from 'services/apiSlice'

export const connectionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        deleteConnection: builder.mutation({
            query: ({ userId }) => ({
                url: `connection-request/connection/delete/${userId}`,
                method: 'DELETE',
            }),
            async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getUserConnections', undefined, (draft) =>
                        draft.filter((user) => user._id !== userId)
                    )
                )
                try {
                    await queryFulfilled
                } catch (_) {
                    patchResult.undo()
                }
            },
        }),
        getUserConnectionRequests: builder.query({
            query: () => ({
                url: '/connection-request/review-requests',
            }),
            transformResponse: (response) => response?.data?.connectionRequests,
        }),
        getUserConnections: builder.query({
            query: () => ({
                url: '/connection-request/connections',
            }),
            transformResponse: (response) => response?.data?.connections,
        }),
        respondToConnectionRequest: builder.mutation({
            query: ({ status, connectionRequestId }) => ({
                url: `connection-request/review/${status}/${connectionRequestId}`,
                method: 'POST',
            }),
            async onQueryStarted({ connectionRequestId }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getUserConnectionRequests', undefined, (draft) =>
                        draft.filter((connectionRequest) => connectionRequest?._id !== connectionRequestId)
                    )
                )
                try {
                    await queryFulfilled
                } catch (_) {
                    patchResult.undo()
                }
            },
        }),
        sendConnectionRequest: builder.mutation({
            query: ({ status, userId }) => ({
                url: `connection-request/send/${status}/${userId}`,
                method: 'POST',
            }),
            transformResponse: (response) => response?.data,
        }),
    }),
})

export const {
    useDeleteConnectionMutation,
    useGetUserConnectionsQuery,
    useGetUserConnectionRequestsQuery,
    useRespondToConnectionRequestMutation,
    useSendConnectionRequestMutation,
} = connectionsApi
