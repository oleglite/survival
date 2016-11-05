import axios from 'axios'


const API_URL = 'http://localhost:8000/api'

const axiosConfig = {
    // xsrfCookieName: 'csrftoken',
    // xsrfHeaderName: 'X-CSRFToken',
}

export function login(username, password) {
    let url = API_URL + '/auth/login/'
    let data = {username, password}
    return axios.post(url, data, axiosConfig)
}
