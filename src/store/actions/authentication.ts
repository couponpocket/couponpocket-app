import {createAction} from '@reduxjs/toolkit';
import {UserProperties} from '../../api/services/authentication';

const action = {
    USER: 'UPDATE_USER',
    LOGIN: 'AUTHENTICATION_LOGIN',
    LOGOUT: 'AUTHENTICATION_LOGOUT'
}

export const updateUser = createAction<UserProperties>(action.USER);

export const login = createAction<{
    user: UserProperties;
    token: string;
}>(action.LOGIN)

export const logout = createAction(action.LOGOUT);

export default action;
