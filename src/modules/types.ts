import {ComponentType, ReactNode} from 'react';

export type NavItem = {
    name: string;
    to: string;
    icon: ReactNode,
    roles: string[],
    children?: Array<{
        name: string;
        to: string;
        icon: ReactNode,
        roles: string[]
    }>;
};

export type NavGroup = {
    name: string;
    isGroup: boolean;
    route: string;
    roles: string[];
    children: Array<NavItem>;
    icon?: ReactNode
};

export type RouteItem = {
    path: string;
    name: string;
    exact: boolean;
    isPrivate: boolean;
    component: ComponentType | ReactNode
};

type QuickFilterReturnType = {
    property: string;
    value: string[] | number | number[] | string;
};
