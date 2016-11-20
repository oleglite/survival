import {ACTIONS} from '../actions/game'

const INITIAL_GAME = {
    alive: true,
    perspective: {
        cells: [],
        stats: {
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
        case ACTIONS.DEATH:
            return {
                ...state,
                alive: false
            }
        default:
            return state
    }
}
