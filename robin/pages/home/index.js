import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import store from '../../core/store';
import Layout from '../../components/Layout';
import * as websocketActions from '../../core/actions/websocketActions';
import * as gameCommands from '../../core/actions/gameCommands';
import Perspective from '../../components/Perspective/Perspective'
import {onKeyDown} from '../../core/keyHandlers'
import KeyHandler from '../../components/KeyHandler'
import Stats from '../../components/Stats/Stats'
import {navigate} from '../../core/actions/routing'
import {ROUTES} from '../../core/routes'


function handleEnter() {
    store.dispatch(gameCommands.enter());
}

function handleConnect() {
    store.dispatch(websocketActions.connect('ws://127.0.0.1:8080/api/v1/')).then(handleEnter);
}

function handleDisconnect() {
    store.dispatch(websocketActions.disconnect());
}

class HomePage extends React.Component {
    componentDidMount () {
        if (!this.props.auth.isLoggedIn) {
            this.props.dispatch(navigate(ROUTES.LOGIN))
        }
    }

    handleKeyDown (e) {
        const action = onKeyDown(e)
        if (action) {
            e.preventDefault()
            this.props.dispatch(action)
        }
    }

    render () {
        const {dispatch, socket, perspective, auth} = this.props

        if (!auth.isLoggedIn) {
            return <Layout/>
        }

        let buttonName;
        if (socket.connected) {
            buttonName = 'Disconnect';
        } else if (socket.connecting) {
            buttonName = 'Connecting...';
        } else {
            buttonName = 'Connect';
        }
        return (
            <Layout>
                <KeyHandler onKeyDown={this.handleKeyDown.bind(this)}/>
                <button className='mdl-button mdl-js-button mdl-button--raised'
                    onClick={socket.connected
                    ? handleDisconnect
                    : handleConnect} disabled={socket.connecting}>
                    {buttonName}
                </button>

                <Perspective perspective={perspective}/>

                <Stats stats={perspective.state}/>

            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        socket: state.socket,
        perspective: state.perspective,
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(HomePage);
