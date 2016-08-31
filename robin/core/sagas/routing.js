import {takeEvery, takeLatest} from 'redux-saga'
import {take, put, call, fork, cancel, cancelled} from 'redux-saga/effects'

import {NAVIGATE} from '../actions/routing'
import history from '../history'
import * as routes from '../routes'


function* navigate(action) {
    yield call(history.push, routes.getLocation(action.route, action.path))
}

function* routing() {
    yield takeEvery(NAVIGATE, navigate)
}

export default routing
