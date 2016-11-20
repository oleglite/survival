import {take, put, call, spawn} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'

import {actions, ACTIONS} from '../actions/socket'
import * as notifications from './notifications'

const SOCKET_EVENT = {
    MESSAGE: 'message',
    CLOSED: 'closed',
    OPENED: 'opened',
    ERROR: 'error',
}

function createSocket(url) {
    return new WebSocket(url)
}

function createSocketChannel(socket) {
    return eventChannel(emit => {
        socket.onopen = () => emit({type: SOCKET_EVENT.OPENED})
        socket.onclose = () => emit({type: SOCKET_EVENT.CLOSED})
        socket.onmessage = evt => emit({type: SOCKET_EVENT.MESSAGE, message: JSON.parse(evt.data)})
        socket.onerror = () => emit({type: SOCKET_EVENT.ERROR})

        return () => {
            if (socket) {
                socket.close()
                socket = null
            }
        }
    })
}

function* listenToSocket(socket) {
    const socketChannel = yield call(createSocketChannel, socket)
    let opened = false
    while (true) {
        const socketEvent = yield take(socketChannel)
        switch (socketEvent.type) {
            case SOCKET_EVENT.OPENED:
                opened = true
                yield put(actions.connected())
                break
            case SOCKET_EVENT.CLOSED:
                opened = false
                yield put(actions.disconnected())
                return
            case SOCKET_EVENT.MESSAGE:
                yield put(actions.received(socketEvent.message))
            case SOCKET_EVENT.ERROR:
                if (!opened) {
                    yield spawn(
                        notifications.error,
                        'Failed to connect',
                        'Please choose other server or try again later'
                    )
                }
        }
    }
}

function* processSendToSocket(socket) {
    while (true) {
        const {type, message} = yield take([ACTIONS.SEND, ACTIONS.DISCONNECT, ACTIONS.DISCONNECTED])
        switch (type) {
            case ACTIONS.SEND:
                socket.send(JSON.stringify(message))
                break
            case ACTIONS.DISCONNECT:
                socket.close()
                break
            case ACTIONS.DISCONNECTED:
                return
        }
    }
}

export default function* socketFlow() {
    while (true) {
        const {url} = yield take(ACTIONS.CONNECT)
        const socket = yield call(createSocket, url)
        yield [
            call(listenToSocket, socket),
            call(processSendToSocket, socket),
        ]
    }
}
