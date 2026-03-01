import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isLogoutDispatched: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInUser: (state, { payload }) => {
            state.user = payload
            state.isLogoutDispatched = false
        },
        signOutUser: (state) => {
            state.user = null
            state.isLogoutDispatched = true
        },
    },
})

export const { signInUser, signOutUser } = authSlice.actions

export default authSlice.reducer
