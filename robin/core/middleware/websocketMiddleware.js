export default function createWebsocketMiddleware(actions) {
    let socket = null;

    const onOpen = (ws, store, resolve) => () => {
        store.dispatch(actions.connected());
        resolve();
    };

    const onClose = (ws, store) => () => {
        store.dispatch(actions.disconnected());
    };

    const onMessage = (ws, store) => evt => {
        store.dispatch(actions.received(JSON.parse(evt.data)));
    };

    return store => next => action => {
        switch (action.type) {

            case actions.CONNECT:
                if (socket !== null) {
                    socket.close();
                }
                // Send an action that shows a "connecting..." status for now
                store.dispatch(actions.connecting());

                return new Promise((resolve, reject) => {
                    // Attempt to connect (we could send a 'failed' action on error)
                    socket = new WebSocket(action.url);
                    socket.onmessage = onMessage(socket, store);
                    socket.onclose = onClose(socket, store);
                    socket.onopen = onOpen(socket, store, resolve);
                });

            case actions.DISCONNECT:
                if (socket !== null) {
                    socket.close();
                }
                socket = null;

                store.dispatch(actions.disconnected());
                break;

            case actions.SEND:
                socket.send(JSON.stringify(action.data));
                break;

            default:
                break;
        }

        return next(action);
    };
}
