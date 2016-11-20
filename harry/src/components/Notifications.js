import React, {PropTypes} from 'react'
import {Message} from 'semantic-ui-react'
import _ from 'lodash'


export const KIND = {
    SUCCESS: 'success',
    ERROR: 'error',
}


function Notifications({items}) {
    return (
        <div className="Notifications">
            {_.map(items, ({kind, header, body}, id) => {
                return (
                    <Message
                        key={id}
                        className={'Notifications__item-' + kind}
                        positive={kind === KIND.SUCCESS}
                        negative={kind === KIND.ERROR}
                    >
                        <Message.Header>{header}</Message.Header>
                        <p>{body}</p>
                    </Message>
                )
            })}
        </div>
    )
}

Notifications.propTypes = {
    items: PropTypes.object
}

export default Notifications
