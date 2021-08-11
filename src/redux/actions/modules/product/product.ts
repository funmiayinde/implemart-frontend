import { createActionType } from '../../../../_shared/ui/redux';


export const ADD_PRODUCT = createActionType('ADD_PRODUCT', 'PRODUCTS');
export const GET_PRODUCTS = createActionType('GET_PRODUCTS', 'PRODUCTS');
export const GET_PRODUCT = createActionType('GET_PRODUCT', 'PRODUCTS');
export const COMMENT_PRODUCT = createActionType('COMMENT_PRODUCT', 'PRODUCTS');


export const getProducts = (params: any = {}) => ({
    type: GET_PRODUCTS.START,
    meta: { params },
});

export const addProduct = (payload: any, params: any = {}) => ({
    type: ADD_PRODUCT.START,
    meta: {payload, params },
});

export const getProduct = (id: any, params: any = {}) => ({
    type: GET_PRODUCT.START,
    meta: {id, params },
});

export const addComment = (id: any, payload: any, params: any = {}) => ({
    type: COMMENT_PRODUCT.START,
    meta: {id, payload, params },
});
