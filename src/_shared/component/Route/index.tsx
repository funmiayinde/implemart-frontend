import React from "react";
import {ComponentType, ReactNode} from 'react';
import {Redirect, Route} from "react-router";
import authService from '../../../services/auth';

export type ICustomRoute = {
    component: ComponentType | ReactNode;
    isPrivate?: boolean;
    isAdmin?: boolean;
    exact?: boolean;
    path: string;
    name?: string;
};

const CustomRoute = (props: ICustomRoute) => {
    const {component: Component, isPrivate, ...rest} = props;
    const isLoggedIn = authService.isLoggedIn();
    return (
        <Route
            {...rest}
            render={props => {
                if (isPrivate && !isLoggedIn) {
                    return (
                        <Redirect
                            exact
                            to={{
                                pathname: '/login',
                                state: {from: props.location.pathname}
                            }}>
                        </Redirect>
                    );
                }
                if (isLoggedIn && (props.location.pathname === '/login') ||
                    props.location.pathname === '/') {
                    return (
                        <Redirect to={{
                            pathname: '/app/market',
                            state: {from: props.location.pathname}
                        }}/>
                    );
                }
                // @ts-ignore
                return <Component {...props}/>
            }}
        />
    );
};

export default CustomRoute;
