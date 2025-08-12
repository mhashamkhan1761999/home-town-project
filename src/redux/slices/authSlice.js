import { createSlice } from "@reduxjs/toolkit";
// import {userApi} from "../services/userService";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    forgotEmail: null,
    twoFaEmail: null,
    twoFaPassword: null,
}

const authSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logout: () => initialState,
        saveAuthenticated: (state, action) => {
            state.isAuthenticated = true;
            state.user = { ...action.payload?.user, };
            state.token = action.payload?.token;
        },
        saveUser: (state, action) => {
            state.user = { ...action.payload?.user, };
        },
        saveRole: (state, action) => {
            state.user = action.payload;
        },
        saveTwoFaEmail: (state, action) => {
            state.twoFaEmail = action.payload;
        },
        saveTwoFaPass: (state, action) => {
            state.twoFaPassword = action.payload;
        },
        saveForgotEmail: (state, action) => {
            state.forgotEmail = action.payload;
        }
    },
})

export const { logout, saveRole, saveAuthenticated, saveForgotEmail, saveTwoFaEmail, saveTwoFaPass, saveUser } = authSlice.actions
export default authSlice.reducer