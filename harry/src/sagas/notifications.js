import {delay} from 'redux-saga'
import {put, call} from 'redux-saga/effects'

import {actions} from '../actions/notifications'


var notificationCounter = 0


function* notify(kind, header, body) {
    notificationCounter++
    const id = notificationCounter
    yield put(actions.add(id, kind, header, body))
    yield call(delay, 5000)
    yield put(actions.remove(id))
}

export function* success(header, body) {
    yield call(notify, 'success', header, body)
}

export function* error(header, body) {
    yield call(notify, 'error', header, body)
}
