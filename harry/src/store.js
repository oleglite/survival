import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import _ from 'lodash'
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from './reducers/index'
import sagas from './sagas/index'


const ignoreActions = [
    'socket/RECEIVED',
    'game/PERSPECTIVE_UPDATED'
]

const loggerMiddleware = createLogger({
    predicate: (getState, action) => !_.includes(ignoreActions, action.type),
    collapsed: (getState, action) => _.startsWith(action.type, 'socket/')
})
const sagaMiddleware = createSagaMiddleware()

export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(
                sagaMiddleware,
                loggerMiddleware
            )
        )
    )
}


const store = configureStore()

sagaMiddleware.run(sagas)

export default store
