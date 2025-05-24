import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showChat: false,
    ongoingChats: [],
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addChat: (state, { payload }) => {
            state.showChat = true
            state.ongoingChats.push(payload)
        },
        removeChat: (state, { payload }) => {
            state.ongoingChats = state.ongoingChats.filter(({ _id }) => payload._id !== _id)
        },
    },
})

export const { addChat, removeChat } = chatSlice.actions

export default chatSlice.reducer
