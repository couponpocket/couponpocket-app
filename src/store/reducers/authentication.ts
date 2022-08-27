import {createReducer} from '@reduxjs/toolkit';
import {login, logout} from '../actions/authentication';

export interface User {
    name: string;
    email: string;
}

export interface AuthenticationState {
    token: string | undefined;
    user: User | undefined;
}

export const initialAuthenticationState: AuthenticationState = {
    token: undefined,
    user: undefined
}

export default createReducer(initialAuthenticationState, builder => {
    builder.addCase(login, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
    })

    builder.addCase(logout, (state) => {
        state.token = undefined;
        state.user = undefined;
    })
})