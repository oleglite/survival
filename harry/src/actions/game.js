import {actions as socket} from './socket'

export const ACTIONS = {
    PERSPECTIVE_UPDATED: 'game/PERSPECTIVE_UPDATED',
}

const DIRECTION = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
}

export const actions = {
    enter: () => socket.send({command: 'enter', user_name: 'user1'}),
    moveUp: () => socket.send({command: 'move', direction: DIRECTION.UP}),
    moveRight: () => socket.send({command: 'move', direction: DIRECTION.RIGHT}),
    moveDown: () => socket.send({command: 'move', direction: DIRECTION.DOWN}),
    moveLeft: () => socket.send({command: 'move', direction: DIRECTION.LEFT}),
    eat: () => socket.send({command: 'eat'}),

    perspectiveUpdated: perspective => ({type: ACTIONS.PERSPECTIVE_UPDATED, perspective}),
}

export function keyToAction(key) {
    switch (key) {
        case 'ArrowRight':
            return actions.moveRight()
        case 'ArrowLeft':
            return actions.moveLeft()
        case 'ArrowUp':
            return actions.moveUp()
        case 'ArrowDown':
            return actions.moveDown()
        case 'e':
            return actions.eat()
    }
}
