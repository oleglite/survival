import {handleReceived} from './game'

export const CONNECT = 'CONNECT';
export const CONNECTING = 'CONNECTING';
export const DISCONNECT = 'DISCONNECT';
export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';
export const SEND = 'SEND';
export const RECEIVED = 'RECEIVED';

export function connect(url) {
    return {type: CONNECT, url};
}

export function connecting() {
    return {type: CONNECTING};
}

export function disconnect() {
    return {type: DISCONNECT};
}

export function connected() {
    return {type: CONNECTED};
}

export function disconnected() {
    return {type: DISCONNECTED};
}

export function send(data) {
    return {type: SEND, data};
}

export function received(data) {
    return handleReceived(data)
}
