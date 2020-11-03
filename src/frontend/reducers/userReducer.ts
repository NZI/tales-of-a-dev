import initialState from "~/frontend/initialState"
import Action from '~/lib/interfaces/Action'
import LoadState from "~/lib/interfaces/LoadState"

export const USER_LOADING = 'USER_LOADING'
export const USER_LOADED = 'USER_LOADED'

export function user(state = initialState.user, action: Action) {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                loadState: LoadState.LOADED,
                user: {
                    ...action.value
                }
            }
        case USER_LOADING:
            return {
                ...state,
                user: null,
                loadState: LoadState.LOADING,
            }
        default:
            return state
    }
}