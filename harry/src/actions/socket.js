export const ACTIONS = {
    CONNECT: 'socket/CONNECT',
    CONNECTED: 'socket/CONNECTED',
    CONNECT_FAILED: 'socket/CONNECT_FAILED',
    DISCONNECT: 'socket/DISCONNECT',
    DISCONNECTED: 'socket/DISCONNECTED',
    SEND: 'socket/SEND',
    RECEIVED: 'socket/RECEIVED',
}

export const actions = {
    connect: url => ({type: ACTIONS.CONNECT, url}),
    connected: () => ({type: ACTIONS.CONNECTED}),
    disconnect: () => ({type: ACTIONS.DISCONNECT}),
    disconnected: () => ({type: ACTIONS.DISCONNECTED}),
    send: message => ({type: ACTIONS.SEND, message}),
    received: message => ({type: ACTIONS.RECEIVED, message}),
}
