const { default: axios } = require("axios");

const tokenManager = require('./token-manager')

class Api {
    constructor() {
        this.apiInstance = axios.create({
            baseURL: 'http://94.103.91.4:5000',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
    async createUser(username) {
        try {
            const body = {
                username
            }
            const result = await this.apiInstance.post('/auth/registration', body)
            return result.data
        } catch (e) {
            console.log(e.message)
        }

    }
    async getClients(username, limit, offset) {
        try {
            const params = {
                limit,
                offset
            }
            const token = await tokenManager.getToken(username)

            if (!token) {
                return ({ message: 'Unauthorized' })
            }
            const result = await this.apiInstance.get('/clients', {
                params,
                headers: {
                    Authorization: token
                }
            })
            return result.data
        } catch (e) {
            console.log(e.message)

        }
    }
    async login(username) {
        try {
            console.log('3')
            const body = {
                username
            }
            const result = await this.apiInstance.post('/auth/login', body)
            await tokenManager.setToken(username, result.data.token)

            return result
        } catch (e) {
            console.log(e.message)

        }
    }

}
module.exports = new Api()