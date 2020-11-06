import initialState from "~/frontend/initialState"
import Action from '~/lib/interfaces/Action'
import LoadState from "~/lib/interfaces/LoadState"

export const APP_SHOW_LOGIN = 'APP_SHOW_LOGIN'
export const APP_HIDE_LOGIN = 'APP_HIDE_LOGIN'
export const APP_TOGGLE_LOGIN = 'APP_TOGGLE_LOGIN'

export function app(state = initialState.app, action: Action) {
    switch (action.type) {
        case APP_SHOW_LOGIN:
            return {
                ...state,
                showLogin: true,
            }
        case APP_HIDE_LOGIN:
            return {
                ...state,
                showLogin: false,
            }
        case APP_TOGGLE_LOGIN:
            return {
                ...state,
                showLogin: !state.showLogin,
            }
        default:
            return state
    }
}