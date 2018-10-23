const getVacantSlots = (board) => {
    const vacantSlots = []
    let counter = 1

    for (let row = 0; row < board.length; row++) {
        for (let column = 0; column < board[row].length; column++) {
            if (board[row][column] === 0) {
                vacantSlots.push(counter)
            }
            counter++
        }
    }

    return vacantSlots
}

module.exports = getVacantSlots
