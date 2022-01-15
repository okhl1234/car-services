import User from '../models/user.js'
import { sendEmailAsync } from '../utils/mailer.js'
import { encrypte, decrypt, compare } from '../utils/encryption.js'

// input : { email: 'kobi@gmail.com', password: '1234' }
export const login = async (req, res) => {
    console.log(`Controllers: Users.login() - body = ${JSON.stringify(req.body)}`)

    const invalidMessage = "User or password are invalid."
    const loginData = req.body
    try {
        const usersWithSameEmails = await User.find({ email : loginData.email}).limit(1)
        const isUserAlreadyExist = usersWithSameEmails.length > 0
        if (!isUserAlreadyExist) {
            console.log("login !isUserAlreadyExist: invalidMessage = " + invalidMessage)
            res.status(404).send(invalidMessage)
            return
        }

        const savedPassword = usersWithSameEmails[0].password
        const isPasswordCorrect = await compare(loginData.password, savedPassword)

        if (!isPasswordCorrect) {
            console.log("login !isPasswordCorrect: invalidMessage = " + invalidMessage)

            res.status(404).send(invalidMessage)
            return
        }

        const userFullName = usersWithSameEmails[0].firstName + " " + usersWithSameEmails[0].lastName
        res.status(200).json({message: "Login Successfully", userFullName: userFullName})
    } catch (err) {
        console.log("login catch: err.message = " + err.message)
        res.status(500).send(err.message)
    }
}

// input : { firstName : 'Kobi', lastName: 'Malka', email: 'kobi@gmail.com', password: '123456' }
export const signup = async (req, res) => {
    console.log(`Controllers: Users.signup() - body = ${JSON.stringify(req.body)}`)
    const userData = req.body

    try {
        const usersWithSameEmails = await User.find({ email: userData.email }).limit(1)
        const isUserAlreadyExist = usersWithSameEmails.length > 0

        if (isUserAlreadyExist) {
            res.status(401).send("user already exists");
            return
        }

        userData.password = await encrypte(userData.password)
        const newUser = new User(userData)
        await newUser.save()

        sendEmailAsync(userData.email, "Welcome " + userData.firstName, "Test Test")

        res.status(200).send("OK");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// input : email
export const sendForgotPasswordEmail = async (req, res) => {
    console.log('user route: /forget-password: post request')

    try {
        const email = req.body.email

        const user = await User.findOne({ email: email})
        if (user == null) { 
            res.send(404).send("Email not found...")
            return
        }

        var decryptedPassword = await decrypt(user.password)
        sendEmailAsync(email, "Forgot Password", "Your password is " + decryptedPassword)

        res.status(200).send("Email with password sent...")
    } catch (err) {
        res.status(500).send(err.message)
    }

}
