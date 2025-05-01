import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toast: null,
}

export const coreUISlice = createSlice({
    name: 'coreUI',
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

export const TOAST_TYPES = {
    ERROR: 'ERROR',
    INFO: 'INFO',
    SUCCESS: 'SUCCESS',
}

export default coreUISlice.reducer
