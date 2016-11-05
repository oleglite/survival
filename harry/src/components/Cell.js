import React, {PropTypes} from 'react'

import './Cell.css'


function Cell({x, y, resources, creatures, size}) {
    var label
    if (resources.food > 0) {
        label = (
            <text className='Cell__label Cell__food' x={x + 20} y={y + 30}>
                Food: {resources.food}
            </text>
        )
    }
    var creaturesLabel
    if (creatures.length > 0) {
        creaturesLabel = (
            <text className='Cell__label Cell__creatures' x={x + 20} y={y + 60}>
                {creatures.join('\n')}
            </text>
        )
    }


    return (
        <g className='Cell'>
            <rect
                className={'Cell__rect'}
                x={x}
                y={y}
                width={size}
                height={size}
                rx='15'
                ry='15'
            />
            {label}
            {creaturesLabel}
        </g>
    )
}

Cell.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    resources: PropTypes.object,
    creatures: PropTypes.array,
}


export default Cell
