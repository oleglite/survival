import {combineReducers} from 'redux'
import socket from './socket'
import perspective from './perspective'

const rootReducer = combineReducers({
    socket,
    perspective,
})

export default rootReducer
