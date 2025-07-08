import { showToast } from '@CoreUI/coreUISlice'
import { apiSlice } from 'services/apiSlice'

export const GET_CHAT_MESSAGES_TAG = 'GET_CHAT_MESSAGES'

export const GET_CHAT_MESSAGES_ENDPOINT = 'getChatMessages'

export const chatMessagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        [GET_CHAT_MESSAGES_ENDPOINT]: builder.query({
            query: (participants) => ({
                url: `/chat/messages/participants`,
                method: 'POST',
                body: participants,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (error) {
                    dispatch(showToast({ error: error?.error }))
                }
            },
            providesTags: [GET_CHAT_MESSAGES_TAG],
            transformResponse: (response) => response?.data?.chatMessages,
        }),
    }),
})

export const { useGetChatMessagesQuery } = chatMessagesApi
