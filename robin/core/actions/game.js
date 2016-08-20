export const PERSPECTIVE_RECEIVED = 'PERSPECTIVE_RECEIVED'
export const GAME_RESPONSE = 'GAME_RESPONSE'

export function handleReceived(data) {
    switch (data.type) {
        case 'perspective':
            return perspectiveReceived(data.data.perspective)
        case 'response':
            return gameResponse()
        default:
            throw 'Unhandled data'
    }
}

export function perspectiveReceived(perspective) {
    return {
        type: PERSPECTIVE_RECEIVED,
        perspective: perspective
    }
}


export function gameResponse() {
    return {
        type: GAME_RESPONSE,
    }
}
