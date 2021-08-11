import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from "connected-react-router";
import {createLogger} from "redux-logger";
import customMiddlewares from './middlewares';
import appReducers from './reducers';
import {Action} from "./type";
import {UIDefaultState} from "./reducers/app/ui";
import createBrowserHistory from "history/createBrowserHistory";
import {assign} from 'lodash';


export const history = createBrowserHistory();

const rootReducer = (state: any, action: Action) => {
    if (action.type === 'RESET_APP_STATE') {
        state = {
            ui: assign({}, UIDefaultState, {
                preference: {
                    notificationSound: true
                }
            }),
        }
    }
    return appReducers(history)(state, action);
};

const middleWares = [...customMiddlewares, routerMiddleware(history)];

if (process.env.NODE_ENV !== 'production') {
    middleWares.push(createLogger());
}

let middleware = applyMiddleware(...middleWares);

if (
    process.env.NODE_ENV !== 'production' &&
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__
) {
    // @ts-ignore
    middleware = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__());
}

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, middleware);

store.subscribe(() => {
    // @ts-ignore
    saveState({app: store.getState().app});
});

export default store;

const storageKey = 'simplemart-state';

function loadState() {
    try {
        const serializedState: any = localStorage.getItem(storageKey);
        if (serializedState === 'null') {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
}

function saveState(state: any) {
    try {
        localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (e) {
    }
}
