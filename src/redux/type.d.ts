import {UIState} from "./reducers/app/ui";
import {ApplicationModulesState} from "./reducers/modules/module";
import {AppState} from "./reducers/app/app";

type Action = {
    type: string;
    payload?: string | any;
    key?: string | number | symbol | any;
    value?: unknown;
    meta?: any;
};

type ResponseSuccess = {
    status_code: number;
    success: boolean;
    message: string;
};

type ResponseError = {
    status_code: number;
    error: {
        code: number;
        message: string;
    },
    errors: any[]
};

type RootApplicationUIState= {
    ui: UIState;
};

type RootApplicationState = {
  app: AppState;
};

type RootState = RootApplicationState & RootApplicationUIState & ApplicationModulesState

type ListResponseType = {
    status_code: number;
    success: boolean;
    pagination: {
        total_count: number;
        per_page: number;
        current: number;
        current_page: string;
        next: string;
        previous: string;
    };
};

type RootState = {}

export {
    Action,
    ListResponseType,
    ResponseError,
    ResponseSuccess,
    RootState,
}
