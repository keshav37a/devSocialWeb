import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, { payload }) => {
            state.user = payload.data.user;
        },
    },
});

export const { loginUser } = authSlice.actions;

export default authSlice.reducer;
