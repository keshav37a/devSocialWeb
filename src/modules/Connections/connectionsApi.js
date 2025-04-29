import { apiSlice } from 'services/apiSlice'

export const connectionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserConnectionRequests: builder.query({
            query: () => ({
                url: '/connection-request/review-requests',
            }),
        }),
        getUserConnections: builder.query({
            query: () => ({
                url: '/connection-request/connections',
            }),
        }),
    }),
})

export const { useGetUserConnectionsQuery, useGetUserConnectionRequestsQuery } = connectionsApi
