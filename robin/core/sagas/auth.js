import {take, put, call, fork, cancel, cancelled} from 'redux-saga/effects'

import {LOGIN, LOGIN_DONE, LOGIN_FAILED, LOGOUT} from '../actions/auth'
import * as api from '../api'
import {show} from '../../components/Toaster'


function* authorize(username, password) {
    try {
        const token = yield call(api.login, username, password)
        yield put({type: LOGIN_DONE})
    } catch (error) {
        yield put({type: LOGIN_FAILED, error})
        yield call(show, 'Failed to login')
    } finally {
        if (yield cancelled()) {
            // ... put special cancellation handling code here
        }
    }
}

function* loginFlow() {
    while (true) {
        const {username, password} = yield take(LOGIN)
        const task = yield fork(authorize, username, password)
        const action = yield take([LOGOUT, LOGIN_FAILED])
        if (action.type == LOGOUT) {
            yield cancel(task)
        }
    }
}

export default loginFlow
