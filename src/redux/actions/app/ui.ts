import {createActionString, createActionType} from "../../../_shared/ui/redux";
import {ReactNode} from "react";


const entity = 'APP';
export const UI_INITIALIZE = createActionString('UI_INITIALIZE', entity);
export const UI_RESET = createActionString('UI_RESET', entity);
export const UI_LOADING = createActionType('UI_LOADING', entity);
export const UI_ERROR = createActionString('UI_ERROR', entity);
export const UI_NAVIGATION = createActionString('UI_NAVIGATION', entity);
export const UI_SET_PAGINATION = createActionType('UI_PAGINATION', entity);


export const initialize = (app: any) => ({
    type: UI_INITIALIZE,
    payload: {app},
});

export const startUILoading = (key: string) => ({
    type: UI_LOADING.START,
    key,
});

export const stopUILoading = (key: string) => ({
    type: UI_LOADING.END,
    key,
});

export const updateUIError = (key: string, value: string | null | ReactNode) => ({
    type: UI_ERROR,
    key,
    value,
});

export const navigateTo = (path: string) => ({
    type: UI_NAVIGATION,
    payload: path,
});

export const uiSetPagination = (key: string, payload: any) => ({
    type: UI_SET_PAGINATION.START,
    meta: {
        key,
        payload,
    }
});
