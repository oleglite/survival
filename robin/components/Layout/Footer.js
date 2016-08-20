import React from 'react'
import Link from '../Link'

function Footer(props) {
    return (
        <footer className={"mdl-mini-footer " + props.className}>
            <div className="mdl-mini-footer__left-section">
                <div className="mdl-logo">© Oleg Beloglazov</div>
                <ul className="mdl-mini-footer__link-list">
                    <li>
                        <Link to="https://github.com/oleglite">github</Link>
                    </li>
                </ul>
            </div>
            <div className="mdl-mini-footer__right-section">
                <ul className="mdl-mini-footer__link-list"></ul>
            </div>
        </footer>
    )
}

export default Footer
