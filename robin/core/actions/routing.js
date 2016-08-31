export const LOCATION_CHANGED = 'LOCATION_CHANGED'
export const NAVIGATE = 'NAVIGATE'


export function locationChanged (location) {
    return {
        type: LOCATION_CHANGED,
        location,
    }
}


export function navigate (route, params={}) {
    return {
        type: NAVIGATE,
        route,
        params,
    }
}
