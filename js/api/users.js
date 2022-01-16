
const API_URL_PREFIX = '/users'

    
const login = async (email, password) => {
    console.log("login: email = " + email + ", password = " + password)

    const url = `${API_URL_PREFIX}/login`

    const user = {
        email : email, 
        password : password
    }
    const response = await sendHttpRequest(url, "POST", user)

    const responseJson = await response.json()
    console.log(responseJson)
    const userFullName = responseJson.userFullName
    console.log("LOGIN - User name = " + userFullName)

    localStorage.setItem('userFullName', userFullName)
    localStorage.setItem('password', responseJson.encryptedPassword)
    
    const isSuccess = response.status === 200
    return isSuccess
}

const signup = async (user) => {
    console.log("signup")

    const url = `${API_URL_PREFIX}/sign-up`
    // const request = {
    //     method: 'POST',
    //     body: JSON.stringify(user),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }

    const response = await sendHttpRequest(url, "POST", user)

    // const response = await fetch(url, request)
    const isSuccess = response.status === 200
    return isSuccess
}

const resetPassword = async (email) => {
    console.log("api: users.resetPassword - email: " + email)
    const url = `${API_URL_PREFIX}/forgot-password`

    const response = await sendHttpRequest(url, "POST", {email: email})

    const isSuccess = response.status === 200
    return isSuccess
}

const sendHttpRequest = async (url, method, body) => {
    const request = {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(url, request)

    console.log("sendHttpRequest: response: " + JSON.stringify(response))
    return response
}
