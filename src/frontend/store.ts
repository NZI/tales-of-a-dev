
import {createStore, applyMiddleware} from 'redux'
import rootReducer from "./reducers"
import {composeWithDevTools} from "redux-devtools-extension"
import createSagaMiddleware from 'redux-saga'
import {debounceCounterToServer} from "~/frontend/sagas/helloWorld";

const sagaMiddleware = createSagaMiddleware()

const composedEnhancer = composeWithDevTools(
    // Add whatever middleware you actually want to use here
    applyMiddleware(sagaMiddleware)
    // other store enhancers if any
)

const store = createStore(rootReducer, composedEnhancer)

sagaMiddleware.run(debounceCounterToServer)

export default store