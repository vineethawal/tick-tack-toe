const interface = require('../utils/interface')
const drawBoard = require('../utils/drawBoard')
const getVacantSlots = require('../utils/getVacantSlots')
const checkWinner = require('../utils/checkWinner')

const playGame = (game) => {
    let currentTurn = 0
    const maxTurns = Math.pow(game.boardSize, 2)

    return turn({currentTurn, maxTurns, game})
        .then(({winner, draw} = {}) => {

            interface.prompt(drawBoard({
                board: game.board,
                playerOne: game.playerOne,
                playerTwo: game.playerTwo,
                maxTurns,
            }))

            if (winner){
                interface.prompt(`Congratulations ${game[winner].name}! You have won.`)
                return {winner}
            } else if (draw) {
                interface.prompt('Its a draw!! :D')
                return {draw}
            }
        })
}

const turn = ({currentTurn, maxTurns, game}) => {
    const currentPlayer = ((currentTurn % 2) === 0) ? 'playerOne' : 'playerTwo'
    const validResponses = getVacantSlots(game.board)

    const winner = checkWinner(game)

    if (winner){
        return {winner}
    } else if (currentTurn === maxTurns) {
        return {draw: true}
    }

    interface.prompt(drawBoard({
        board: game.board,
        playerOne: game.playerOne,
        playerTwo: game.playerTwo,
        maxTurns,
    }))

    return interface.question({
        body: `${game[currentPlayer].name}, choose a box to place an '${game[currentPlayer].sign}' into:`,
        isNumber: true,
        validResponses,
    }).then((slotNumber) => {
        const row = Math.floor((slotNumber - 1) / game.boardSize)
        const column = Math.floor((slotNumber - 1) % game.boardSize)

        game.board[row][column] = game[currentPlayer].holder

        currentTurn++

        return turn({currentTurn, maxTurns, game})
    })
}

module.exports = playGame
