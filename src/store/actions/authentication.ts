import {createAction} from '@reduxjs/toolkit';
import {User} from '../reducers/authentication';

const action = {
    LOGIN: 'AUTHENTICATION_LOGIN',
    LOGOUT: 'AUTHENTICATION_LOGOUT'
}

export const login = createAction<{
    user: User,
    token: string
}>(action.LOGIN)

export const logout = createAction(action.LOGOUT);

export default action;
