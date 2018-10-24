const checkWinner = ({board, playerOne, playerTwo, patternLength}) => {
    let winner = false

    loop1:
    for (let row = 0; row < board.length; row++) {
        loop2:
        for (let column = 0; column < board[row].length; column++) {
            const checkHorizontal = column <= (board[row].length - patternLength)
            const checkVertical =  row <= (board.length - patternLength)
            const checkBackwardHorizontal = column >= (patternLength - 1)

            if (checkHorizontal) {
                winner = performHorizontalCheck({board, playerOne, playerTwo, patternLength, row, column})
            }

            if (!winner && checkVertical) {
                winner = performVerticalCheck({board, playerOne, playerTwo, patternLength, row, column})
            }

            if (!winner && checkHorizontal && checkVertical) {
                winner = performForwardDiagonalCheck({board, playerOne, playerTwo, patternLength, row, column})
            }

            if (!winner && checkBackwardHorizontal && checkVertical) {
                winner = performBackwardDiagonalCheck({board, playerOne, playerTwo, patternLength, row, column})
            }

            if (winner) {
                break loop1
            }
        }
    }

    return winner
}

const performHorizontalCheck = ({board, playerOne, playerTwo, patternLength, row, column}) => {
    let sum = 0

    for (let counter = 0; counter < patternLength; counter++) {
        sum += board[row][column + counter]
    }

    return mapSumToWinner({sum, playerOne, playerTwo, patternLength})
}

const performVerticalCheck = ({board, playerOne, playerTwo, patternLength, row, column}) => {
    let sum = 0

    for (let counter = 0; counter < patternLength; counter++) {
        sum += board[row + counter][column]
    }

    return mapSumToWinner({sum, playerOne, playerTwo, patternLength})
}

const performForwardDiagonalCheck = ({board, playerOne, playerTwo, patternLength, row, column}) => {
    let sum = 0

    for (let counter = 0; counter < patternLength; counter++) {
        sum += board[row + counter][column + counter]
    }

    return mapSumToWinner({sum, playerOne, playerTwo, patternLength})
}

const performBackwardDiagonalCheck = ({board, playerOne, playerTwo, patternLength, row, column}) => {
    let sum = 0

    for (let counter = 0; counter < patternLength; counter++) {
        sum += board[row + counter][column - counter]
    }

    return mapSumToWinner({sum, playerOne, playerTwo, patternLength})
}

const mapSumToWinner = ({sum, playerOne, playerTwo, patternLength}) => {
    if (sum === (playerOne.holder * patternLength)) {
        return 'playerOne'
    } else if (sum === (playerTwo.holder * patternLength)) {
        return 'playerTwo'
    } else {
        return false
    }
}

module.exports = checkWinner
