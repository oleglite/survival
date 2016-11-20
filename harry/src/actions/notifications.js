export const ACTIONS = {
    ADD: 'notifications/ADD',
    REMOVE: 'notifications/REMOVE',
}


export const actions = {
    add: (id, kind, header, body) => ({type: ACTIONS.ADD, kind, id, header, body}),
    remove: id => ({type: ACTIONS.REMOVE, id})
}
