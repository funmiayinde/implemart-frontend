import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import app from './app';
import modules from './modules';

const appReducers = (history: any) =>
    combineReducers({
        router: connectRouter(history),
        ...app,
        ...modules,
    });

export default appReducers;
