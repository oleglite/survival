import {ACTIONS} from '../actions/game'

const INITIAL_GAME = {
    perspective: {
        cells: [],
        state: {
            hunger: 0,
            illness: 0,
        }
    }
}


export default function(state=INITIAL_GAME, action) {
    switch (action.type) {
        case ACTIONS.PERSPECTIVE_UPDATED:
            return {
                ...state,
                perspective: action.perspective,
            }
        default:
            return state
    }
}
