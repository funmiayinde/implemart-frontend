import {NavGroup} from "../../types";


export default (module: string = 'app', {}) => {
    const navItems: Array<NavGroup> = [
        {
            name: 'Market',
            isGroup: false,
            route: `/${module}`,
            children: [],
            roles: ['anybody']
        },
        {
            name: 'Profile',
            isGroup: false,
            route: `/${module}`,
            children: [],
            roles: ['anybody']
        },
    ];
    return navItems;
};

