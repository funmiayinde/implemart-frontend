import {Action} from '../../type';
import {UI_ERROR, UI_INITIALIZE, UI_LOADING, UI_RESET, UI_SET_PAGINATION} from "../../actions/app/ui";
import _ from 'lodash';
import {initializeModule} from "../../../modules/navs";

export interface UIState {
    module: string;
    errors: any;
    loading: any;
    pagination: any;
    initializer: any;
}

export const UIDefaultState: UIState = {
    module: 'app',
    errors: {},
    loading: {},
    pagination: {},
    initializer: {},
};

const uiReducer = (state = UIDefaultState, action: Action) => {
    switch (action.type) {
        case UI_INITIALIZE:
            const {app = {}}: any = action.payload;
            return {
                ...state,
                module,
                initializer: initializeModule(app)
            };
        case UI_RESET: {
            return UIDefaultState;
        }
        case UI_LOADING.START:
            return getNewLoadingState(state, action, true);
        case UI_LOADING.END:
            return getNewLoadingState(state, action, false);
        case UI_ERROR:
            return _.assign({}, state, {
                errors: {...state.errors,  [action.key]: action.value},
            });
        case UI_SET_PAGINATION.START:
            const {key, payload}: any = action.meta;
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    [key]: payload
                }
            };
        default:
            return state;
    }
};

export default uiReducer;

function getNewLoadingState(currentState: any = {}, action: Action, value: any) {
    const {key}: Action = action;
    return _.assign({}, currentState, {
        loading: {...currentState.loading, [key]: value},
    });
}
