import React from 'react'


class MDLComponent extends React.Component {
    componentDidMount() {
        window.componentHandler.upgradeElement(this.root)
    }

    componentWillUnmount() {
        window.componentHandler.downgradeElements(this.root)
    }
}

export default MDLComponent
