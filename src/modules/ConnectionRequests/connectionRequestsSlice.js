import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    connectionRequests: null,
}

const connectionRequestsSlice = createSlice({
    name: 'connectionRequests',
    initialState,
    reducers: {
        addConnectionRequests: (state, { payload }) => {
            state.connectionRequests = payload
        },
    },
})

export const { addConnectionRequests } = connectionRequestsSlice.actions

export default connectionRequestsSlice.reducer
