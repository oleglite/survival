import React, {PropTypes} from 'react'
import _ from 'lodash'
import {Segment} from 'semantic-ui-react'

import './Perspective.css'

import Cell from './Cell'


class Perspective extends React.Component {
    render () {
        const {cells} = this.props.perspective || {}
        const center = 500
        const gap = 10
        const cellSize = 150
        const offset = -cellSize / 2
        return (
            <Segment className='Perspective'>
                <svg width="400" height="400" viewBox="0 0 1000 1000">
                    {_.map(cells, (cell, i) => {
                        return (
                            <Cell
                                key={cell.id}
                                resources={cell.resources}
                                creatures={cell.creatures}
                                x={center + offset + (cellSize + gap) * cell.point[0]}
                                y={center + offset + (cellSize + gap) * cell.point[1]}
                                size={cellSize}
                            />
                        )
                    })}
                </svg>
            </Segment>
        )
    }
}

Perspective.propTypes = {
    perspective: PropTypes.object.isRequired,
}

export default Perspective
