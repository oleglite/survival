import React from 'react'

import GitHubLogo from '../GitHubLogo'
import {} from '../../core/actions/auth'


function LoginButton () {
    return (
        <button className="mdl-button mdl-js-button mdl-button--raised">
            Login with GitHub <GitHubLogo/>
        </button>
    )
}

export default LoginButton
