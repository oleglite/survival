import React from 'react'

import MDLComponent from '../MDLComponent'


class TextField extends MDLComponent {
    render() {
        const {value, onChange, label, password} = this.props
        var id = ['TextField', value, label].join('_')
        return (
            <form action="#" ref={node => (this.root = node)}>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type={password ? 'password' : 'text'}
                        id={id}
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value)
                        }}/>
                    <label
                        className="mdl-textfield__label"
                        htmlFor={id}
                    >
                        {label}
                    </label>
                </div>
            </form>
        )
    }
}

TextField.propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired,
    password: React.PropTypes.bool,
}

export default TextField
