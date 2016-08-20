import * as commands from './actions/gameCommands'

export function onKeyDown (e) {
    switch (e.key) {
        case 'ArrowRight':
            return commands.moveRight()
        case 'ArrowLeft':
            return commands.moveLeft()
        case 'ArrowUp':
            return commands.moveUp()
        case 'ArrowDown':
            return commands.moveDown()
        case 'e':
            return commands.eat()
        default:
            console.log(e)
            return null
    }
}
