import React from 'react'


function Button ({label, onClick}) {
    return (
        <button className="mdl-button mdl-js-button mdl-button--raised" onClick={onClick}>
            {label}
        </button>
    )
}


export default Button
