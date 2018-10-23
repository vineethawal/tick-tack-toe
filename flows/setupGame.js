var interface = require('../utils/interface')

const setupGame = () => {

    const game = {
        playerOne: {name: 'Player 1', sign: 'X', holder: 1},
        playerTwo: {name: 'Player 2', sign: 'O', holder: -1},
        boardSize: 3,
        patternLength: 3,
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
            body: 'Enter board size (Minimum 3):',
            defaults: game.boardSize,
            isNumber: true,
        })
    }).then((response) => {
        if (response && response < 3) {
            interface.prompt('Board size less than 3 not supported!')
            return Promise.reject()
        }
        if (response) {
            game.boardSize = response
        }

        game.board = initBoard(game.boardSize)
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
