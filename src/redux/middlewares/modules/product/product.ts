import { Middleware } from 'redux';
import { Action, RootState } from '../../../type';
import { ADD_PRODUCT, COMMENT_PRODUCT, GET_PRODUCT, GET_PRODUCTS } from '../../../actions/modules/product';
import { httpRequest } from '../../../actions/app';


export const createProduct: Middleware<unknown, RootState> = ({ dispatch }) => next => (action: Action) => {
    next(action);
    if (action.type === ADD_PRODUCT.START) {
        const {  payload, ...rest } = action.meta;
        const formData = new FormData();
        const { description, file, coordinates, name, price } = payload;
        formData.append('price', price);
        formData.append('description', description);
        formData.append('file', file);
        formData.append('coordinates', coordinates);
        formData.append('name', name);
        dispatch(
            httpRequest({
                method: 'post',
                url: '/products',
                key: 'createProduct',
                payload: formData,
                ...rest,
                onSuccess: (data => {
                    dispatch({ type: ADD_PRODUCT.SUCCESS, payload: data });
                    // dispatch({
                    //     type: GET_PRODUCTS.START,
                    //     payload: { params: { population: JSON.stringify(['media']) } },
                    // });
                }),
            }),
        );
    }
};

export const getProduct: Middleware<unknown, RootState> = ({ dispatch }) => next => (action: Action) => {
    next(action);
    if (action.type === GET_PRODUCT.START) {
        const { id, ...rest } = action.meta;
        dispatch(
            httpRequest({
                method: 'get',
                url: `/products/${id}`,
                key: 'getProduct',
                ...rest,
                onSuccess: (data => {
                    dispatch({ type: GET_PRODUCT.SUCCESS, payload: data });
                }),
            }),
        );
    }
};

export const getProducts: Middleware<unknown, RootState> = ({ dispatch }) => next => (action: Action) => {
    next(action);
    if (action.type === GET_PRODUCTS.START) {
        const { ...rest } = action.meta;
        dispatch(
            httpRequest({
                method: 'get',
                url: `/products`,
                key: 'getProducts',
                ...rest,
                onSuccess: (data => {
                    console.log('getProducts-data:', data);
                    dispatch({ type: GET_PRODUCTS.SUCCESS, payload: data });
                }),
            }),
        );
    }
};

export const commentProduct: Middleware<unknown, RootState> = ({ dispatch }) => next => (action: Action) => {
    next(action);
    if (action.type === COMMENT_PRODUCT.START) {
        const {id, ...rest } = action.meta;
        dispatch(
            httpRequest({
                method: 'post',
                url: `/products/${id}/comment`,
                key:  'commentProduct',
                ...rest,
                onSuccess: (data => {
                    dispatch({ type: COMMENT_PRODUCT.SUCCESS, payload: data });
                }),
            }),
        );
    }
};
export default [
    createProduct,
    commentProduct,
    getProduct,
    getProducts,
];
