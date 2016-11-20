import {take, put, fork, select} from 'redux-saga/effects'
import _ from 'lodash'

import {ACTIONS} from '../actions/socket'
import {actions} from '../actions/game'


function* gameWorker() {
    while (true) {
        const {message} = yield take(ACTIONS.RECEIVED)
        if (message.perspective) {
            yield put(actions.perspectiveUpdated(_.get(message, 'perspective', {})))
        }
        if (message.is_dead) {
            const alive = yield select(state => state.game.alive)
            if (alive) {
                yield put(actions.death())
            }
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
