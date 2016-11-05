import {take, put, fork} from 'redux-saga/effects'
import _ from 'lodash'

import {ACTIONS} from '../actions/socket'
import {actions} from '../actions/game'


function* gameWorker() {
    while (true) {
        const {message} = yield take(ACTIONS.RECEIVED)
        if (message.type === 'perspective') {
            yield put(actions.perspectiveUpdated(_.get(message, 'data.perspective', {})))
        }
    }
}


export default function* gameFlow() {
    yield fork(gameWorker)  // TODO: cancel on disconnect
    while (true) {
        yield take(ACTIONS.CONNECTED)
        yield put(actions.enter())
    }
}
