import {lowerCase, isEmpty} from 'lodash';

export interface CreateActionType {
    START: string;
    SUCCESS: string;
    ERROR: string;
    END: string;
}


export const createActionString = (type: string, entity = 'app'): string => `@@${lowerCase(entity)}/${type}`;

export const createActionType = (type: string, entity = 'app'): CreateActionType => ({
    START: `@@${lowerCase(entity)}/${type}_START`,
    SUCCESS: `@@${lowerCase(entity)}/${type}_SUCCESS`,
    ERROR: `@@${lowerCase(entity)}/${type}_ERROR`,
    END: `@@${lowerCase(entity)}/${type}_END`
});

export const arrayToByHash = (array: any[] = []) => {
    return array.reduce((accumulator, currentObject) => {
        const {hash} = currentObject;
        accumulator[hash] = currentObject;
        return accumulator;
    }, {});
};

export const arrayToById = (array: any[] = []) => {
    return array.reduce((accumulator, currentObject) => {
        const { _id } = currentObject;
        accumulator[_id] = currentObject;
        return accumulator;
    }, {});
};

export const byIdSelector = (byHashValue: any) => {
    return !isEmpty(byHashValue) ? Object.values(byHashValue) : [];
};
