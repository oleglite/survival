import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import createWebsocket from './middleware/websocketMiddleware'
import * as websocketActions from './actions/websocketActions'
import sagas from './sagas/index'

const loggerMiddleware = createLogger()
const websocketMiddleware = createWebsocket(websocketActions)
const sagaMiddleware = createSagaMiddleware()

export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            sagaMiddleware,
            loggerMiddleware,
            websocketMiddleware
        )
    )
}


const store = configureStore()

sagaMiddleware.run(sagas)

export default store
