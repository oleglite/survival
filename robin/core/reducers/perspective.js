import {PERSPECTIVE_RECEIVED} from '../actions/game'

const initialState = {
    cells: [],
    state: {
        hunger: 0,
        illness: 0,
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PERSPECTIVE_RECEIVED:
            return Object.assign({}, state, action.perspective)
        default:
            return state;
    }
}
