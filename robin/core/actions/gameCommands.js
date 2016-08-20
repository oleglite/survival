import {send} from './websocketActions';

const DIRECTION = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
};

export function enter() {
    return send({command: 'enter', user_name: 'user1'});
}

export function moveUp() {
    return send({command: 'move', direction: DIRECTION.UP});
}

export function moveRight() {
    return send({command: 'move', direction: DIRECTION.RIGHT});
}

export function moveDown() {
    return send({command: 'move', direction: DIRECTION.DOWN});
}

export function moveLeft() {
    return send({command: 'move', direction: DIRECTION.LEFT});
}

export function eat() {
    return send({command: 'eat'});
}
