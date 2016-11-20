import auth from './auth'
import routing from './routing'
import socket from './socket'
import game from './game'
import notifications from './notifications'


export default function(state={}, action) {
    state = {
        ...state,
        auth: auth(state.auth, action),
        socket: socket(state.socket, action),
        game: game(state.game, action),
        notifications: notifications(state.notifications, action),
    }

    return {
        ...state,
        routing: routing(state.routing, action, state.auth)
    }
}
