var interface = require('../utils/interface')

const setupGame = () => {

    const game = {
        playerOne: {name: 'Player 1', sign: 'X', holder: 1},
        playerTwo: {name: 'Player 2', sign: 'O', holder: -1},
        boardSize: MIN_BOARD_SIZE,
        patternLength: MIN_BOARD_SIZE,
    }

    return interface.question({
        body: 'Enter name for Player 1:',
        defaults: game.playerOne.name,
    }).then((response) => {
        if (response) {
            game.playerOne.name = response
        }
        return interface.question({
            body: 'Enter name for Player 2:',
            defaults: game.playerTwo.name,
        })
    }).then((response) => {
        if (response) {
            game.playerTwo.name = response
        }
        return interface.question({
            body: `Enter board size (Min. ${MIN_BOARD_SIZE}):`,
            defaults: game.boardSize,
            isNumber: true,
        })
    }).then((response) => {
        if (response && response < MIN_BOARD_SIZE) {
            interface.prompt(`Board size less than ${MIN_BOARD_SIZE} not supported!`)
            return Promise.reject()
        }
        if (response) {
            game.boardSize = response
        }

        game.board = initBoard(game.boardSize)

        if (game.boardSize > MIN_BOARD_SIZE) {
            return interface.question({
                body: `Enter winning pattern length (Min. ${MIN_BOARD_SIZE}, Max. ${game.boardSize}):`,
                defaults: game.patternLength,
                isNumber: true,
            })
        } else {
            return null
        }

    }).then((response) => {
        if (response && (response < MIN_BOARD_SIZE || response > game.boardSize)) {
            interface.prompt('Incorrect winning pattern length!')
            return Promise.reject()
        }
        if (response) {
            game.patternLength = response
        }
        return game
    })
}

const initBoard = (boardSize) => {
    const board = []
    for (let row = 0; row < boardSize; row++) {
        board[row] = []
        for (let column = 0; column < boardSize; column++) {
            board[row][column] = 0
        }
    }
    return board
}

module.exports = setupGame
