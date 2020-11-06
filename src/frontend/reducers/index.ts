import { combineReducers } from 'redux'

import {counter} from './counterReducer'
import {user} from './userReducer'
import {page} from './pageReducer'
import {app} from './appReducer'

const rootReducer = combineReducers({
    counter,
    user,
    page,
    app
})

export default rootReducer
