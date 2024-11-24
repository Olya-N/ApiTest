const redis = require('redis')
const client = redis.createClient()


class TokenManager {
    constructor() {
        this.client = client
        this.client.on('error', (err) => {
            console.error('Redis error: ', err);
        })

    }

    async connect() {
        try {
            await this.client.connect()
            console.log('Redis is connected')
        } catch (err) {
            console.error('Failed to connect to Redis:', err)
            throw err
        }
    }

    async setToken(username, token) {
        await this.client.set(`token:${username}`, token, 'EX', 3600)
    }

    async getToken(username) {
        return await this.client.get(`token:${username}`)
    }
    async disconnect() {
        await this.client.quit()
        console.log('Redis is disconnected')
    }
}

module.exports = new TokenManager()
