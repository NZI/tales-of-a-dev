import initialState from "~/frontend/initialState"
import Action from '~/lib/interfaces/Action'
import LoadState from "~/lib/interfaces/LoadState"
import {PageState} from "~/lib/interfaces/State";

export const PAGE_LOADING = 'PAGE_LOADING'
export const PAGE_NOT_LOADED = 'PAGE_NOT_LOADED'
export const PAGE_LOADED = 'PAGE_LOADED'

export function page(state = initialState.page, action: Action): PageState {
    switch (action.type) {
        case PAGE_NOT_LOADED:
            return {
                ...state,
                loadState: LoadState.NOT_LOADED,
            }
        case PAGE_LOADED:
            return {
                ...state,
                loadState: LoadState.LOADED,
            }
        case PAGE_LOADING:
            return {
                ...state,
                loadState: LoadState.LOADING,
            }
        default:
            return state
    }
}