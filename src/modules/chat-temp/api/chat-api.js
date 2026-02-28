import { showToast } from 'src/modules/layout-temp/api/layout-slice'
import { apiSlice } from 'services/api-slice'

import { GET_CHAT_MESSAGES_ENDPOINT, GET_CHAT_MESSAGES_TAG } from 'src/modules/chat-temp/constants/chat-constants'

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
