import React, {PropTypes} from 'react'
import _ from 'lodash'

import s from './Perspective.css'
import Cell from './Cell'
import {CELL_SIZE} from '../../core/constants'


class Perspective extends React.Component {
    render () {
        const {cells, state} = this.props.perspective
        const center = 500
        const gap = 10
        return (
            <div className={s.main} onKeyDown={(e) => {console.log(e)}}>
                <svg width="400" height="400" viewBox="0 0 1000 1000">
                    {_.map(cells, (cell, i) => {
                        return <Cell
                            key={cell.id}
                            resources={cell.resources}
                            creatures={cell.creatures}
                            x={center + (CELL_SIZE + gap) * cell.point[0]}
                            y={center + (CELL_SIZE + gap) * cell.point[1]}
                        />
                    })}
                </svg>
            </div>
        )
    }
}

Perspective.propTypes = {
    perspective: PropTypes.object.isRequired,
}

export default Perspective
