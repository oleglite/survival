import React from 'react'
import MDLComponent from '../MDLComponent'

class Header extends MDLComponent {
    render() {
        return (
            <header className="mdl-layout__header" ref={node => (this.root = node)}>
                <div className="mdl-layout__header-row" {...this.props}/>
            </header>
        );
    }

}

export default Header
