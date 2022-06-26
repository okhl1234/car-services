
function isValidName(name) {
    // check that the name is contains only letters
    if (name.length == 0) {
        return false
    }

    const validRejex = /^[A-Za-z\s]*$/
    return name.match(validRejex)
}

function isValidEmail(email) {
    if (email.length == 0) {
        return false
    }

    const validRejex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return email.match(validRejex)
}

function isValidPassword(password) {
    if (password.length < 4) {
        console.log('Password invalid, must contain at least 4 characters')
        return false
    }

    return true
}

function isValidPasswords(password, passwordConfirm) {
    // check for valid password, and compare between them.
    if (password.length == 0 && passwordConfirm.length == 0 || password != passwordConfirm) {
        return false
    }

    return true
}

function isValidCarNumber(carNunber){
    const validRejex = /^[0-9]{6,8}$/;
    var isValid = true
    if(!carNunber.match(validRejex)) {
        isValid =  false
    }
    return isValid

}