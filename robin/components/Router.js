import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import * as actions from '../core/actions/routing'
import history from '../core/history'
import * as routes from '../core/routes'


class Router extends React.Component {
    componentDidMount() {
        this.props.dispatch(actions.locationChanged(history.getCurrentLocation().pathname))
        history.listen(location => {
            this.props.dispatch(actions.locationChanged(location.pathname))
        })
    }

    render() {
        const {route, params} = this.props.routing
        if (!route) {
            return null
        }
        const Page = routes.getPage(route, params)
        return <Page/>
    }
}

function mapStateToProps(state) {
    return {
        routing: state.routing,
    }
}

export default connect(mapStateToProps)(Router)
