import {combineReducers} from 'redux'
import socket from './socket'
import perspective from './perspective'
import auth from './auth'
import routing from './routing'

const rootReducer = combineReducers({
    socket,
    perspective,
    auth,
    routing,
})

export default rootReducer
