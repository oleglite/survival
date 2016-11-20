import React, {PropTypes} from 'react'
import {Menu, Label} from 'semantic-ui-react'

import './GameSidebar.css'


function GameSidebar({connected, connecting, url, connectClicked, disconnectClicked, stats}) {
    let items = []

    if (connected) {
        items.push(
            <Menu.Item key="stats">
                <Menu.Header>Stats</Menu.Header>

                <Menu.Menu>
                    <Menu.Item>Illness <Label>{(stats.illness * 100).toFixed()}</Label></Menu.Item>
                    <Menu.Item>Hunger <Label>{(stats.hunger * 100).toFixed()}</Label></Menu.Item>
                </Menu.Menu>
            </Menu.Item>
        )
    }

    let connectionButton
    if (connected) {
        connectionButton = 'Disconnect'
    } else if (connecting) {
        connectionButton = 'Connecting...'
    } else {
        connectionButton = 'Connect'
    }

    items.push(
        <Menu.Item key="connectionButton" name={connectionButton} onClick={() => {
            if (connected) {
                disconnectClicked()
            } else if (!connecting) {
                connectClicked(url)
            }
        }}/>
    )

    return (
        <Menu className="GameSidebar" vertical>
            {items}
        </Menu>
    )
}

GameSidebar.propTypes = {
    connected: PropTypes.bool,
    connecting: PropTypes.bool,
    url: PropTypes.string.isRequired,
    connectClicked: PropTypes.func.isRequired,
    disconnectClicked: PropTypes.func.isRequired,
    stats: PropTypes.object.isRequired
}

export default GameSidebar
