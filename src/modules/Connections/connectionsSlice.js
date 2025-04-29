import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    connections: null,
    connectionRequests: null,
}

const connectionsSlice = createSlice({
    name: 'connections',
    initialState,
    reducers: {
        addConnections: (state, { payload }) => {
            state.connections = payload
        },
        addConnectionRequests: (state, { payload }) => {
            state.connectionRequests = payload
        },
    },
})

export const { addConnections, addConnectionRequests } = connectionsSlice.actions

export default connectionsSlice.reducer
