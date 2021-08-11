import {Middleware} from "redux";
import {Action, RootState} from "../../type";
import {LOGIN, LOGOUT, SIGN_UP} from "../../actions/app/auth";
import {httpRequest, navigateTo} from "../../actions/app";
import {POST} from "../../actions";
import _ from 'lodash';
import {history} from '../../store';
import {push} from "connected-react-router";

const login: Middleware<unknown, RootState> = ({dispatch}) => (next: Function) => (action: Action) => {
    next(action);
    if (action.type === LOGIN.START) {
        dispatch(
            httpRequest({
                method: POST,
                url: '/login',
                key: 'login',
                noErrorMessage: false,
                ...action.meta,
                onSuccess: data => {
                    dispatch({type: LOGIN.SUCCESS, payload: data});
                    const nextRoute = _.get(action, ['meta', 'nextRoute']);
                    if (nextRoute) {
                        if (_.isFunction(nextRoute)) {
                            nextRoute();
                        } else if (_.isString(nextRoute)) {
                            dispatch(navigateTo(nextRoute));
                        }
                    } else {
                        dispatch(navigateTo(`/app/market`));
                    }
                },
            })
        )
    }
};

const signUp: Middleware<unknown, RootState> = ({dispatch}) => (next: Function) => (action: Action) => {
    next(action);
    if (action.type === SIGN_UP.START) {
        dispatch(
            httpRequest({
                method: POST,
                url: '/sign-up',
                key: 'signUp',
                noErrorMessage: false,
                onSuccess: data => {
                    dispatch({type: SIGN_UP.SUCCESS, payload: data});
                    const nextRoute = _.get(action, ['meta', 'nextRoute']);
                    if (nextRoute) {
                        if (_.isFunction(nextRoute)) {
                            nextRoute();
                        } else if (_.isString(nextRoute)) {
                            dispatch(navigateTo(nextRoute));
                        }
                    } else {
                        dispatch(navigateTo(`/app/market`));
                    }
                },
                ...action.meta,
            })
        )
    }
};

const logout: Middleware<unknown, RootState> = ({dispatch}) => (next: Function) => (action: Action) => {
    const {type} = action;
    if (type === LOGOUT.START){
        const {pathname} = (!!history && history.location) || {};
        if (pathname && pathname === '/login'){
            dispatch(push('/login'));
            dispatch({type: 'RESET_APP_STATE'});
        }
    }
    next(action);
};

export default [login, signUp, logout];
