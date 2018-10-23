const drawBoard = ({board, playerOne, playerTwo, maxTurns}) => {
    let canvas = ''
    let counter = 1

    const maxCounterLength = maxTurns.toString().length

    for (let row = 0; row < board.length; row++) {

        for (let column = 0; column < board[row].length; column++) {
            const slot = board[row][column]

            if (slot === 0) {
                canvas += counter.toString().padStart(maxCounterLength, '0')
            } else if (playerOne.holder === slot) {
                canvas += playerOne.sign.toString().padStart(maxCounterLength, ' ')
            } else if (playerTwo.holder === slot) {
                canvas += playerTwo.sign.toString().padStart(maxCounterLength, ' ')
            }

            if (column !== (board[row].length - 1)) {
                canvas += ' | '
            }

            counter++
        }

        canvas += '\n'

        if (row !== board.length - 1) {
            canvas += ''.padStart((maxCounterLength + 2) * board[row].length, '-') + '\n'
        }

    }

    return canvas
}

module.exports = drawBoard
