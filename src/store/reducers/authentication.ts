import {createReducer, current} from '@reduxjs/toolkit';
import {login, logout, updateUser} from '../actions/authentication';
import {UserProperties} from '../../api/services/authentication';

export interface AuthenticationState {
    token: string | undefined;
    user: UserProperties | undefined;
}

export const initialAuthenticationState: AuthenticationState = {
    token: undefined,
    user: undefined
}

export default createReducer(initialAuthenticationState, builder => {
    builder.addCase(updateUser, (state, action) => {
        if (JSON.stringify(current(state.user)) === JSON.stringify(action.payload)) {
            return;
        }

        state.user = action.payload;
    })

    builder.addCase(login, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
    })

    builder.addCase(logout, (state) => {
        state.token = undefined;
        state.user = undefined;
    })
})