export const ACTIONS = {
    LOGIN: 'auth/LOGIN',
    LOGIN_DONE: 'auth/LOGIN_DONE',
    LOGIN_FAILED: 'auth/LOGIN_FAILED',
    LOGOUT: 'auth/LOGOUT',
    FIELD_CHANGED: 'auth/FIELD_CHANGED',
}

export const actions = {
    login: (username, password) => ({type: ACTIONS.LOGIN, username, password}),
    loginDone: () => ({type: ACTIONS.LOGIN_DONE}),
    loginFailed: (error) => ({type: ACTIONS.LOGIN_FAILED, error}),
    logout: () => ({type: ACTIONS.LOGOUT}),
    fieldChanged: (field, value) => ({type: ACTIONS.FIELD_CHANGED, field, value}),
}
