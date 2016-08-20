import React, {PropTypes} from 'react'
import _ from 'lodash'

import s from './Stats.css'


Stats.propTypes = {
    stats: PropTypes.object.isRequired
}

const STATS = {
    hunger: 'Hunger',
    illness: 'Illness',
}

function Stats({stats}) {
    var sl = s
    console.log(stats)
    return (
        <div className={s.main}>
            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <tbody>
                {_.map(STATS, (name, stat) => {
                    return (
                        <tr>
                            <td className="mdl-data-table__cell--non-numeric">{name}</td>
                            <td>{_.get(stats, stat, '-').toFixed(2)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Stats
