const readline = require('readline')
const validateInputs = require('./validateInputs')

const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const interface = {}

interface.question = ({body, defaults = '', validResponses = null, isNumber = false, retries = 0} = {}) => {
    ++retries
    return new Promise ((resolve, reject) => {
        cli.question(body + '\n' + (defaults && `Default: ${defaults}\n`), (answer) => {

            if(!answer && defaults) {
                answer = defaults
            }

            const validation = validateInputs({answer, validResponses, isNumber})

            if (validation.isValid) {
                resolve(validation.response)
            } else if (retries <= MAX_RETRIES) {
                interface.prompt(`Incorrect response, please re-enter (retry no. ${retries})`)
                interface.question({body, defaults, validResponses, isNumber, retries: retries}).then(resolve, reject)
            } else {
                interface.prompt('Max retries exhausted, bye!')
                reject('Error: Max retries exhausted')
            }
        })
    })
}

interface.close = () => {
    cli.close()
}

interface.prompt = (body) => {
    cli.write(body+'\n')
}

module.exports = interface
