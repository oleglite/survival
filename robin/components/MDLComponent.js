import React from 'react'


class MDLComponent extends React.Component {
    componentDidMount() {
        if (window.componentHandler) {
            window.componentHandler.upgradeElement(this.root)
        }
    }

    componentWillUnmount() {
        if (window.componentHandler) {
            window.componentHandler.downgradeElements(this.root)
        }
    }
}

export default MDLComponent
