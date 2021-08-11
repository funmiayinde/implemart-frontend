import React, {useEffect, Suspense, ComponentType} from 'react';
import {RootState} from "../../redux/type";
import {connect, ConnectedProps} from "react-redux";
import {RouteComponentProps} from 'react-router-dom';
import {initialize, navigateTo} from "../../redux/actions/app";
import Route from "../../_shared/component/Route";

const dispatchProps = {
    initialize,
    navigateTo
};

// state derived props
const statesProps = (state: RootState) => ({
    initializer: state.ui.initializer,
    app: state.app,
});

// here create connection to state
const connector = connect(statesProps, dispatchProps);

// Evaluates the props derived from stateProps and dispatchProps
type PropsFromRedux = ConnectedProps<typeof connector>;

type ApplicationLayoutRouteProps = RouteComponentProps<{ module: string }>;

// create the props union
type ApplicationLayoutProps = ApplicationLayoutRouteProps & PropsFromRedux & {};

const Loading = () => <div className="text-center justify-content-center"/>;

const AppLayout = (props: ApplicationLayoutProps) => {
    console.log('app-props:', props);
    const {
        match: {params},
        initialize,
        app,
        initializer
    } = props;

    const init = initializer[params['module']];

    useEffect(() => {
        initialize(app);
    }, []);

    return (
        <div>
            <Suspense fallback={<Loading/>}>
                {init && init && !!init.routes.length && init.routes.map((
                    {
                        component: Component,
                        path,
                        exact,
                        name,
                        isPrivate,
                    }: {
                        component: ComponentType;
                        path: string,
                        exact: boolean,
                        name: string,
                        isPrivate: boolean,
                        redirect: any,
                        isAdmin: any;
                    },
                ) => {
                    if (Component) {
                        return (
                            <Route
                                exact={exact}
                                path={`/${params['module']}${path}`}
                                name={name}
                                isPrivate={isPrivate}
                                component={Component}
                            />
                        );
                    }
                })}
            </Suspense>
        </div>
    )
};

export default connector(AppLayout);
