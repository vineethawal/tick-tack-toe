require('./globals')

const interface = require('./utils/interface')
const setupGame = require('./flows/setupGame')
const playGame = require('./flows/playGame')

interface.prompt('Lets play tick-tac-toe!!')

const play = () => {
    setupGame()
        .then(playGame)
        .then(() => {
            return interface.question({
                body: 'Play a new game?',
                validResponses: ['yes', 'no'],
                defaults: 'yes',
            })
        })
        .then((playAgain) => {
            if (playAgain === 'yes') {
                play()
                return true
            } else {
                interface.prompt('Thanks for playing!!')
                interface.close()
            }
        })
        .catch(() => {
            interface.prompt('Sorry, something went wrong! :( \nExiting!')
            interface.close()
        })
}

play()
