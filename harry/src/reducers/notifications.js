import _ from 'lodash'

import {ACTIONS} from '../actions/notifications'


const INITIAL_STATE = {
    items: {}   // id: {kind, header, body}
}


export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case ACTIONS.ADD:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.id]: {
                        kind: action.kind,
                        header: action.header,
                        body: action.body,
                    }
                }
            }

        case ACTIONS.REMOVE:
            return {
                ...state,
                items: _.omit(state.items, action.id)
            }

        default:
            return state
    }
}
