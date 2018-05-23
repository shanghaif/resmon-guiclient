import { getAuthServer } from '../reducers';
import * as api from '../api';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_OUT = 'SIGN_OUT';
export const CHANGE_AUTH_SERVER = 'CHANGE_AUTH_SERVER';
export const RESTORE_SESSION = 'RESTORE_SESSION';

export const changeAuthServer = (server) => ({
    type: CHANGE_AUTH_SERVER,
    server
});

export const restoreSession = () => ({
    type: RESTORE_SESSION
});

export const signOut = () => ({
    type: SIGN_OUT
});

export const signIn = (credentials) => (dispatch, getState) => {
    dispatch({ type: SIGN_IN_REQUEST });
    const authServer = getAuthServer(getState());
    const { remember, ...userData } = credentials;
    api.signIn(authServer, userData).then(
        (payload) => {
            dispatch({ type: SIGN_IN_SUCCESS, payload, credentials })
        },
        ({ code, error }) => {
            dispatch({ type: SIGN_IN_FAILURE, code, error });
        }
    );
}

export const signUp = (credentials) => (dispatch, getState) => {
    dispatch({ type: SIGN_UP_REQUEST });
    const authServer = getAuthServer(getState());
    api.signUp(authServer, credentials).then(
        (payload) => {
            dispatch({ type: SIGN_UP_SUCCESS, payload, credentials })
        },
        ({ code, error }) => {
            dispatch({ type: SIGN_UP_FAILURE, code, error });
        }
    );
}