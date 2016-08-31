import _ from 'lodash'
import toRegExp from 'path-to-regexp'

import home from '../pages/home'
import login from '../pages/login'
import error from '../pages/error'
import about from '../pages/about'

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    ERROR: '/error',
    ABOUT: '/about',
}


export const PAGES = {
    [ROUTES.HOME]: home,
    [ROUTES.LOGIN]: login,
    [ROUTES.ERROR]: error,
    [ROUTES.ABOUT]: about,
}


export function findRoute (location) {
    var res = {route: ROUTES.ERROR, params: {}}
    _.forEach(ROUTES, route => {
        let params = matchURI(route, location)
        if (params) {
            res = {route, params}
        }
    })
    return res
}

export function getPage (route, params) {
    return PAGES[route]
}

export function getLocation (route, params) {
    var toPath = toRegExp.compile(route)
    return toPath(params)
}

function decodeParam(val) {
    if (!(typeof val === 'string' || val.length === 0)) {
        return val;
    }

    try {
        return decodeURIComponent(val);
    } catch (err) {
        if (err instanceof URIError) {
            err.message = `Failed to decode param '${val}'`;
            err.status = 400;
        }

        throw err;
    }
}

export function matchURI(route, path) {
    const pattern = toRegExp(route, [])
    const match = pattern.exec(path)

    if (!match) {
        return null;
    }

    const params = Object.create(null);

    for (let i = 1; i < match.length; i++) {
        params[route.keys[i - 1].name] = match[i] !== undefined
            ? decodeParam(match[i])
            : undefined;
    }

    return params;
}
