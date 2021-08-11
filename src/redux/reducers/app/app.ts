import {Action} from "../../type";
import {LOGIN, LOGOUT, RESET_APP_STATE, SIGN_UP, UPDATE_SESSION_TOKEN} from "../../actions/app";

export type AppState = {
    auth: any | null;
    session: string | null;
};

const defaultState: AppState = {
    auth: null,
    session: null,
};

const appReducer = (state = defaultState, action: Action): AppState => {
    switch (action.type) {
        case RESET_APP_STATE:
            return {...state, ...defaultState};
        case UPDATE_SESSION_TOKEN:
            return {
                ...state,
                session: action.payload,
            };
        case LOGIN.SUCCESS:
        case SIGN_UP.SUCCESS:
            return {
                ...state,
                auth: action.payload,
            };
        case LOGOUT.START:
            return defaultState;
        default:
            return state;
    }
};

export default appReducer;
