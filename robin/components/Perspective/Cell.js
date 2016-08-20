import React, {PropTypes} from 'react'

import {CELL_SIZE} from '../../core/constants'
import s from './Cell.css'

Cell.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    resources: PropTypes.object,
    creatures: PropTypes.array,
}

function Cell(props) {
    const {x, y, resources, creatures} = props

    var label
    if (resources.food > 0) {
        label = <text className={s.label + ' ' + s.food} x={x + 20} y={y + 30}>Food: {resources.food}</text>
    }
    var creaturesLabel
    if (creatures.length > 0) {
        creaturesLabel = <text className={s.label + ' ' + s.creatures} x={x + 20} y={y + 60}>{creatures.join('\n')}</text>
    }


    return (
        <g>
            <rect
                className={s.cell}
                x={x}
                y={y}
                width={CELL_SIZE}
                height={CELL_SIZE}
                rx='15'
                ry='15'
            />
            {label}
            {creaturesLabel}
        </g>
    )
}

export default Cell
