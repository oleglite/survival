import * as actions from '../actions/routing'
import * as routes from '../routes'


const initialState = {
    location: null,
    route: null,
    params: {},
}


export default function (state = initialState, action) {
    switch (action.type) {
        case actions.LOCATION_CHANGED:
            const {route, params} = routes.findRoute(action.location)
            return Object.assign({}, state, {
                location: action.location,
                route,
                params,
            })
        default:
            return state
    }
}
