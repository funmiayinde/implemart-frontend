import appNavs from './App/_config/_app.nav';
import appRoute from './App/_config/_app.routes';


export const initializeModule = (app: any) => {
    return {
        app: {
            name: 'App',
            navigation: appNavs(app, {}),
            routes: appRoute
        }
    }
};
