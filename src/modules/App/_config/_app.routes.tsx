import {RouteItem} from "../../types";
import {lazy} from 'react';

const Market = lazy(()=> import('../Market/lib'));
const Profile = lazy(()=> import('../Profile/lib'));


const appRoutes: Array<RouteItem> = [
    {
        path: '/app/market',
        name: 'Market',
        exact: true,
        isPrivate: true,
        component: Market,
    },
    {
        path: '/app/profile',
        name: 'Profile',
        exact: true,
        isPrivate: true,
        component: Profile,
    },
];

export default appRoutes;
