import React, {Component} from 'react'
import {Menu, Container} from 'semantic-ui-react'
import './Layout.css'


class Layout extends Component {
    render() {
        return (
            <div>
                <Menu className="Layout" inverted>
                    <Container>
                        <Menu.Item name='home' active/>
                        <Menu.Item name='messages'/>
                        <Menu.Item name='friends'/>
                    </Container>
                </Menu>
                {this.props.children}
            </div>
        )
    }
}

export default Layout
