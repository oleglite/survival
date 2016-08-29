import * as actions from '../actions/auth'

const initialState = {
    isLoggedIn: false,
    fields: {
        username: '',
        password: '',
    },
}

function fields (state, action) {
    switch (action.type) {
        case actions.AUTH_FIELD_CHANGED:
            return Object.assign({}, state, {
                [action.field]: action.value
            })
        case actions.LOGIN_DONE:
            return Object.assign({}, state, {
                password: ''
            })

        default:
            return state
    }
}

export default function (state = initialState, action) {
    return Object.assign({}, state, {
        fields: fields(state.fields, action)
    })
}
