const express = require('express')
require('dotenv').config()
const api = require('./api-class')
const tokenManager = require('./token-manager')


async function main() {
    const PORT = process.env.PORT || 4000
    const app = express()
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))

//вызов функций здесь(для хранения токенов использовался redis)
    await tokenManager.connect()
    const testUser = 'userNumber1'
    // await api.createUser(testUser)
    await api.login(testUser)
    console.log(await api.getClients(testUser, 1000, 0))
    await tokenManager.disconnect()
}


main()