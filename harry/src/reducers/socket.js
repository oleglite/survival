import {ACTIONS} from '../actions/socket';

const INITIAL_SOCKET = {
    connected: false,
    connecting: false,
    url: 'ws://127.0.0.1:8080/api/v1/'
}

export default function socket(state=INITIAL_SOCKET, action) {
    switch (action.type) {
        case ACTIONS.CONNECTING:
            return {
                ...state,
                connecting: true
            }

        case ACTIONS.CONNECTED:
            return {
                ...state,
                connected: true,
                connecting: false
            }

        case ACTIONS.DISCONNECTED:
            return {
                ...state,
                connected: false,
                connecting: false
            }

        default:
            return state;
    }
}
