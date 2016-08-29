// import fetch from 'whatwg-fetch'

import {API_URL} from './constants'

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

function parseJSON(response) {
    return response.json()
}


function createRequestFunction (method) {
    return function (url, data, conf) {
        conf = Object.assign({
          method: method,
          body: JSON.stringify(data)
        }, conf)
        return fetch(url, conf)
            .then(checkStatus)
            .then(parseJSON)
    }
}

var requests = {
    get: createRequestFunction('GET'),
    post: createRequestFunction('POST'),
}


export function login(username, password) {
    return requests.post(API_URL + '/auth/login/', {username, password})
}
