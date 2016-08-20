import * as websocketActions from '../actions/websocketActions';

const initialSocket = {
    connected: false,
    connecting: false
}

export default function socket(state = initialSocket, action) {
    switch (action.type) {
        case websocketActions.CONNECTING:
            return Object.assign({}, state, {connecting: true});
        case websocketActions.CONNECTED:
            return Object.assign({}, state, {
                connected: true,
                connecting: false
            });
        case websocketActions.DISCONNECTED:
            return Object.assign({}, state, {
                connected: false,
                connecting: false
            });
        default:
            return state;
    }
}
