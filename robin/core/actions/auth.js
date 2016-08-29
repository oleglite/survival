export const LOGIN = 'LOGIN'
export const LOGIN_DONE = 'LOGIN_DONE'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT = 'LOGOUT'
export const AUTH_FIELD_CHANGED = 'AUTH_FIELD_CHANGED'


export function login(username, password) {
    return {
        type: LOGIN,
        username,
        password
    }
}

export function loginDone() {
    return {
        type: LOGIN_DONE
    }
}

export function loginFailed() {
    return {
        type: LOGIN_FAILED
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function authFieldChanged(field, value) {
    return {
        type: AUTH_FIELD_CHANGED,
        field,
        value
    }
}
