import React from 'react'

import TextField from '../fields/TextField'
import Button from '../Button'
import s from './LoginForm.css'


function LoginForm ({fields, onChange, onLogin}) {
    return (
        <div className={s.root}>
            <TextField
                label="User name"
                value={fields.username}
                onChange={value => onChange('username', value)}
            />
            <TextField
                label="Password"
                password
                value={fields.password}
                onChange={value => onChange('password', value)}
            />
            <Button
                label="Log In"
                onClick={onLogin}
            />
        </div>
    )
}

LoginForm.propTypes = {
    fields: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onLogin: React.PropTypes.func.isRequired,
}

export default LoginForm
