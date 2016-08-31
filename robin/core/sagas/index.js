import auth from './auth'
import routing from './routing'
import {fork} from 'redux-saga/effects'


function* sagas () {
    yield fork(auth)
    yield fork(routing)
}

export default sagas
