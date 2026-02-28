import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInUser: (state, { payload }) => {
            state.user = payload
        },
        signOutUser: (state) => {
            state.user = null
        },
    },
})

export const { signInUser, signOutUser } = authSlice.actions

export default authSlice.reducer
