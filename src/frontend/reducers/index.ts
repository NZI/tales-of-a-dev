import { combineReducers } from 'redux'

import {counter} from './counterReducer'
import {user} from './userReducer'

const rootReducer = combineReducers({
    counter,
    user
})

export default rootReducer
