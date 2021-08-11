import {createActionString, createActionType} from "../../../_shared/ui/redux";

export const LOGIN = createActionType('LOGIN', 'Auth');
export const SIGN_UP = createActionType('SIGN_UP', 'Auth');
export const UPDATE_SESSION_TOKEN = createActionString('UPDATE_SESSION_TOKEN', 'auth');
export const LOGOUT = createActionType('LOGOUT', 'Auth');


export const login = (payload: any, nextRoute: () => void) => ({
    type: LOGIN.START,
    meta: {payload, nextRoute}
});

export const signUp = (payload: any, nextRoute?: () => void) => ({
    type: SIGN_UP.START,
    meta: {payload, nextRoute}
});

export const updateSessionToken = (token: string) => ({
    type: UPDATE_SESSION_TOKEN,
    payload: token,
});

export const logout = () => ({
   type: LOGOUT.START
});
