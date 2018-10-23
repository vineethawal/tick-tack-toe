const validateInputs = ({answer, validResponses = null, isNumber}) => {
    let isValid = false
    let response = answer

    if (isNumber && answer) {
        response = parseInt(answer)

        if (!isNaN(response)) {
            isValid = true
        }
    } else {
        isValid = true
    }

    if (validResponses) {
        if (validResponses.indexOf(response) !== -1) {
            isValid = true
        } else {
            isValid = false
        }
    }

    // console.log({isValid, response})
    return {isValid, response}
}


module.exports = validateInputs
