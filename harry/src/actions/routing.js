export const ACTIONS = {
    NAVIGATE: 'routing/NAVIGATE',
    LOCATION_CHANGED: 'routing/LOCATION_CHANGED'
}

export const actions = {
    navigate: (route, params={}) => ({type: ACTIONS.NAVIGATE, route, params}),
    locationChanged: (location) => ({type: ACTIONS.LOCATION_CHANGED, location})
}
