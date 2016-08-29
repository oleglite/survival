import {combineReducers} from 'redux'
import socket from './socket'
import perspective from './perspective'
import auth from './auth'

const rootReducer = combineReducers({
    socket,
    perspective,
    auth,
})

export default rootReducer
