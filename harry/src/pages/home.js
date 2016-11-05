import React, {Component} from 'react'
import {connect} from 'react-redux'
import './home.css'

import Layout from '../components/Layout'
import {actions} from '../actions/socket'
import Perspective from '../components/Perspective'
import KeyHandler from '../components/KeyHandler'
import {keyToAction} from '../actions/game'
import GameSidebar from '../components/GameSidebar'
import GameHelp from '../components/GameHelp'


class HomePage extends Component {
    render() {
        return (
            <Layout className="HomePage">
                <div className="HomePage__content">
                    <div className="HomePage__item HomePage__left_side">
                        <GameSidebar
                            connected={this.props.connected}
                            connecting={this.props.connecting}
                            url={this.props.url}
                            connectClicked={this.props.connectClicked}
                            disconnectClicked={this.props.disconnectClicked}
                            stats={this.props.stats}
                        />
                    </div>
                    <div className="HomePage__item HomePage__middle">
                    {
                        !this.props.connected ? null : [
                            <KeyHandler key='keyHanlder' onKeyDown={this.props.onKeyDown}/>,
                            <Perspective key='perspective' perspective={this.props.perspective}/>,
                        ]
                    }
                    </div>
                    <div className="HomePage__item HomePage__right_side">
                        <GameHelp/>
                    </div>
                </div>
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    return {
        connected: state.socket.connected,
        connecting: state.socket.connecting,
        url: state.socket.url,
        perspective: state.game.perspective,
        stats: state.game.perspective.state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        connectClicked: url => dispatch(actions.connect(url)),
        disconnectClicked: () => dispatch(actions.disconnect()),
        onKeyDown: e => {
            const action = keyToAction(e.key)
            if (action) {
                e.preventDefault()
                dispatch(action)
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
