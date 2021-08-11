import { Action } from '../../../type';
import { ADD_PRODUCT, COMMENT_PRODUCT, GET_PRODUCT, GET_PRODUCTS } from '../../../actions/modules/product';
import _ from 'lodash';
import { arrayToById } from '../../../../_shared/ui/redux';

export type ProductState = {
    byId: any,
    byPage: any,
    totalData: number,
    currentPage: number,
};

const defaultState: ProductState = {
    byId: {},
    byPage: {},
    totalData: 0,
    currentPage: 1,
};
const productReducer = (state = defaultState, action: Action) => {
    switch (action.type) {
        case GET_PRODUCTS.SUCCESS: {
            console.log('action.payload:', action.payload);
            const page = _.get(action, ['payload', '_meta', 'pagination', 'current'], 1);
            // const data = _.get(action, ['payload', 'data'], []);
            const data = action.payload;
            // const totalData = _.get(action, ['payload', '_meta', 'pagination', 'total_count'], data?.length ?? 0);
            return {
                ...state,
                byId: arrayToById(data),
                byPage: { ...state.byPage, [`page_${page}`]: data },
                // totalData,
                // currentPage: page,
            };
        }
        case GET_PRODUCT.SUCCESS:
        case COMMENT_PRODUCT.SUCCESS:
        case ADD_PRODUCT.SUCCESS: {
            const payload = action?.payload ?? {};
            let byId = state.byId;
            let byPage = payload;
            return { ...state, byId, byPage };
            // if (state.byId[payload._id]) {
            //     byId = { ...state.byId, [payload._id]: payload };
            // }
            // if (_.has(byPage, `page_${state.currentPage}`)) {
            //     const page = _.get(byPage, `page_${state.currentPage}`);
            //     if (page[payload._id]) {
            //         page[payload._id] = payload;
            //         byPage = { ...state.byPage, [`page_${state.currentPage}`]: page };
            //     }
            // }
            // return { ...state, byId, byPage };
        }
        default:
            return state;
    }
};

export default productReducer;
