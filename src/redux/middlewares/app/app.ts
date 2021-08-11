import { isEmpty, isFunction, isString } from 'lodash';
import { message } from 'antd';
import { Dispatch, Middleware } from 'redux';
import {
    API_REQUEST,
    startUILoading,
    stopUILoading,
    UI_NAVIGATION,
    uiSetPagination, updateSessionToken,
    updateUIError,
} from '../../actions/app';
import { Action, RootState } from '../../type';
import { batch } from 'react-redux';
import { createAPIRequest } from '../../../services/axios';
import { push } from 'connected-react-router';


export const alertSuccess = (successMessage: string, key: string) => {
    message.success({ content: successMessage, key, duration: 6 });
};

export const alertError = (errorMessage: string, key: string) => {
    message.error({ content: errorMessage, key, duration: 4 });
};

interface HandleErrorParams {
    error: { message: string, messages: string[] };
    dispatch: Dispatch;
    key: string;
    noErrorMessage: boolean;
    errorMessage: string;
}

export const handleErrors = ({ error, dispatch, key, noErrorMessage, errorMessage }: HandleErrorParams) => {
    if (!errorMessage) {
        dispatch(updateUIError(key, error?.message));
        if (!noErrorMessage && isString(error?.message)) {
            alertError(error?.message, key || '');
        }
        if (!isEmpty(error?.message)) {
            Object.values(error?.messages || {})
                .flat()
                .map((message: string) => {
                    alertError(message, key || '');
                });
        }
    } else {
        dispatch(updateUIError(key, errorMessage));
        alertError(errorMessage, key || '');
    }
};

const loadStartUpAction: Middleware<unknown, RootState> = () => next => (action: Action) => {
    next(action);
};

const httpRequest: Middleware<unknown, RootState> = ({ dispatch }) => next => (action: Action) => {
    if (action.type === API_REQUEST.START) {
        const {
            method,
            url,
            key,
            payload,
            onError,
            successMessage,
            params,
            onSuccess,
            nextRoute,
            errorMessage,
            noErrorMessage,
            noSuccessMessage = false,
            metadata = false,
            onAfterError,
        } = action.meta;
        console.log('meta-data:', { ...action.meta });
        const config = { method, url, data: undefined, params: undefined };
        if (payload && (!isEmpty(payload)) || payload instanceof FormData) {
            config.data = payload;
        }
        if (params && !isEmpty(params)) {
            config.params = params;
        }
        batch(() => {
            dispatch(updateUIError(key, null));
            dispatch(startUILoading(key));
        });
        createAPIRequest(config)
            .then((response: any) => {
                const { data } = response;
                console.log('data:', response);
                const meta = response?._meta || null;
                batch(() => {
                    if (meta && meta.pagination) {
                        dispatch(uiSetPagination(key, meta.pagination));
                    }
                    if (meta && meta.token) {
                        console.log('token:', meta.token);
                        dispatch(updateSessionToken(meta.token));
                    }
                    if (onSuccess) {
                        if (typeof onSuccess === 'function') {
                            console.log('onSuccess is true');
                            if (metadata) {
                                onSuccess(response);
                            } else {
                                onSuccess(data);
                            }
                        }
                    } else {
                        if (metadata) {
                            console.log('response:', response);
                            dispatch({ type: onSuccess, payload: response });
                        } else {
                            dispatch({ type: onSuccess, payload: data });
                        }
                    }
                    if (nextRoute) {
                        if (isFunction(nextRoute)) {
                            nextRoute();
                        }
                        if (isString(nextRoute)) {
                            dispatch(push(nextRoute));
                        }
                    }
                    dispatch(stopUILoading(key));
                    const notificationMessage = successMessage || meta?.message;
                    if (!noSuccessMessage && notificationMessage) {
                        alertSuccess(notificationMessage, key || '');
                    }
                });
            }).catch((error: any) => {
            console.log('api-error:', error?.data);
            batch(() => {
                if (onError) {
                    if (isFunction(onError)) {
                        onError(error);
                    } else {
                        handleErrors({
                            error,
                            dispatch,
                            key,
                            noErrorMessage,
                            errorMessage,
                        });
                    }
                } else {
                    const err = (error && error?.data && error?.data?._meta && error?.data?._meta?.error) ||
                        (error && error.error) || error;
                    console.log('api-error-2:', err);
                    handleErrors({
                        error: err,
                        dispatch: dispatch,
                        key: key,
                        noErrorMessage,
                        errorMessage,
                    });
                }
                dispatch(stopUILoading(key));
                if (isFunction(onAfterError)) {
                    onAfterError(error);
                }
            });
        });
    }
    return next(action);
};


const navigateTo: Middleware<unknown, RootState> = ({ dispatch }) => next => (action: Action) => {
    next(action);
    if (action.type === UI_NAVIGATION) {
        const { payload } = action;
        if (isString(payload)) {
            dispatch(push(payload));
        }
    }
};

export default [loadStartUpAction, httpRequest, navigateTo];
