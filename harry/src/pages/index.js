import React from 'react'
import {connect} from 'react-redux'

import login from './login'
import home from './home'


export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
}

const pages = {
    [ROUTES.LOGIN]: login,
    [ROUTES.HOME]: home,
}


function RouterBase({route, params}) {
    let Page = pages[route]
    return (
        <Page route={route} params={params}/>
    )
}

function mapStateToProps(state) {
    return {
        route: state.routing.route,
        params: state.routing.params
    }
}

export const Router = connect(mapStateToProps)(RouterBase)
