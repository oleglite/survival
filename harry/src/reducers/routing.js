import {ACTIONS} from '../actions/routing'
import {ROUTES} from '../pages/index'
import {parseLocation} from '../utils/routing'


const INITIAL_ROUTING = {
    route: null,
    params: {},
}


export default function (state=INITIAL_ROUTING, action, authState) {
    if (!authState.isLoggedIn && state.route !== ROUTES.LOGIN) {
        return {
            ...state,
            route: ROUTES.LOGIN,
            params: {}
        }
    }
    switch (action.type) {
        case ACTIONS.LOCATION_CHANGED:
            const {route, params} = parseLocation(action.location)
            return {
                ...state,
                route,
                params,
            }
        case ACTIONS.NAVIGATE:
            return {
                ...state,
                route: action.route,
                params: action.params,
            }
        default:
            return state
    }
}
