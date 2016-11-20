import {take, put, call, fork, cancel, cancelled} from 'redux-saga/effects'

import {ACTIONS, actions} from '../actions/auth'
import {actions as routingActions} from '../actions/routing'
import * as api from '../api'
import {ROUTES} from '../pages/index'
import * as notifications from './notifications'


function* authorize(username, password) {
    try {
        yield call(api.login, username, password)
        yield put(actions.loginDone())
        yield put(routingActions.navigate(ROUTES.HOME))
    } catch (error) {
        yield put(actions.loginFailed(error))
        yield call(notifications.error, 'Failed to login')
    } finally {
        if (yield cancelled()) {
            // ... put special cancellation handling code here
        }
    }
}

function* loginFlow() {
    while (true) {
        const {username, password} = yield take(ACTIONS.LOGIN)
        const task = yield fork(authorize, username, password)
        const action = yield take([ACTIONS.LOGOUT, ACTIONS.LOGIN_FAILED])
        if (action.type === ACTIONS.LOGOUT) {
            yield cancel(task)
        }
    }
}

export default loginFlow
