import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    csrfToken: null,
    isAuthenticated: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.csrfToken = action.payload.csrfToken;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.csrfToken = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
