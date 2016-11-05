import {ACTIONS} from '../actions/auth'


const INITIAL_AUTH = {
    isLoggedIn: false,
    username: '',
    password: '',
}


export default function(state=INITIAL_AUTH, action) {
    switch (action.type) {
        case ACTIONS.FIELD_CHANGED:
            return {
                ...state,
                [action.field]: action.value
            }

        case ACTIONS.LOGIN_DONE:
            return {
                ...state,
                password: '',
                isLoggedIn: true
            }

        default:
            return state
    }
}
