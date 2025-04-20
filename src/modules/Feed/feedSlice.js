import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    feed: null,
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        addFeed: (state, { payload }) => {
            state.feed = payload
        },
    },
})

export const { addFeed } = feedSlice.actions

export default feedSlice.reducer
