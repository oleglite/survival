import {PropTypes, Component} from 'react'


class KeyHandler extends Component {
    componentDidMount () {
        window.addEventListener('keydown', this.props.onKeyDown)
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.props.onKeyDown)
    }

    render () {
        return null
    }
}

KeyHandler.propTypes = {
    onKeyDown: PropTypes.func,
}

export default KeyHandler
