import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        userId: null,
        role: null
    },
    reducers: {
        login:(state, action) => {
            state.isAuthenticated = true;
            state.userId = action.payload.userId;
            state.role = action.payload.role;
        },
        logout:(state) =>{
            state.isAuthenticated = false;
            state.userId = null;
            state.role = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;