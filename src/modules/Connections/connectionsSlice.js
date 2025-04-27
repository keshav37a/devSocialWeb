import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    connections: null,
}

const connectionsSlice = createSlice({
    name: 'connections',
    initialState,
    reducers: {
        addConnections: (state, { payload }) => {
            state.connections = payload
        },
    },
})

export const { addConnections } = connectionsSlice.actions

export default connectionsSlice.reducer
