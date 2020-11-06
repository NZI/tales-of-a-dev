import {User} from "~/lib/entities/User"
import LoadState from "~/lib/interfaces/LoadState"
import {DefaultRootState} from "react-redux";

export interface CounterState {
    value: number,
    serverValue: any,
}

export interface UserState {
    user?: User,
    loadState: LoadState,
}

export interface PageState {
    loadState: LoadState,
}

export interface AppState {
    showLogin: boolean,
}

export interface State extends DefaultRootState {
    counter: CounterState,
    user: UserState,
    page: PageState,
    app: AppState
}