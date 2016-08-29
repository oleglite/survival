import React from 'react'


function Toaster () {
    return (
        <div className="mdl-snackbar mdl-js-snackbar">
            <div className="mdl-snackbar__text"></div>
            <button type="button" className="mdl-snackbar__action"></button>
        </div>
    )
}

export default Toaster


export function show (message) {
    const notification = document.querySelector('.mdl-js-snackbar')
    notification.MaterialSnackbar.showSnackbar(
        {
            message: message
        }
    )
}
