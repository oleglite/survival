import React from 'react'
import Link from '../Link'
import MDLComponent from '../MDLComponent'

class Navigation extends MDLComponent {
    render() {
        return (
            <nav className="mdl-navigation" ref={node => (this.root = node)}>
                <Link className="mdl-navigation__link" to="/">Home</Link>
                <Link className="mdl-navigation__link" to="/about">About</Link>
            </nav>
        )
    }

}

export default Navigation
