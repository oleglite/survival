import React from 'react'
import Header from './Header'
import Navigation from './Navigation'
import Footer from './Footer'
import MDLComponent from '../MDLComponent'
import s from './Layout.css'

class Layout extends MDLComponent {
    render() {
        return (
            <div className="mdl-layout mdl-js-layout" ref={node => (this.root = node)}>
                <div className="mdl-layout__inner-container">
                    <Header>
                        <span className="mdl-layout-title">React Static Boilerplate</span>
                        <div className="mdl-layout-spacer"></div>
                        <Navigation/>
                    </Header>
                    <main className={"mdl-layout__content " + s.wrapper}>
                        <div className={s.content} {...this.props}/>
                        <Footer className={s.footer}/>
                    </main>
                </div>
            </div>
        );
    }
}

export default Layout
