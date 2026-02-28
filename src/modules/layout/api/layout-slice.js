import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toast: null,
}

export const coreUISlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        showToast: (state, { payload }) => {
            state.toast = payload
        },
        resetToast: (state) => {
            state.toast = null
        },
    },
})

export const { showToast, resetToast } = coreUISlice.actions

export default coreUISlice.reducer
