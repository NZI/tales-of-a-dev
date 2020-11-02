
import {createStore, applyMiddleware} from 'redux'
import rootReducer from "./reducers"
import {composeWithDevTools} from "redux-devtools-extension";


const composedEnhancer = composeWithDevTools(
    // Add whatever middleware you actually want to use here
    applyMiddleware()
    // other store enhancers if any
)

export default createStore(rootReducer, composedEnhancer)
