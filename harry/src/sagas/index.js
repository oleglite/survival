import {fork} from 'redux-saga/effects'

import auth from './auth'
import socket from './socket'
import game from './game'


function* sagas () {
    yield fork(auth)
    yield fork(socket)
    yield fork(game)
}

export default sagas
