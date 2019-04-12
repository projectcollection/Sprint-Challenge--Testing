const express = require('express')

const gamesRouters = require('./gamesRouters/gamesRouters')

const app = express()

app.use(express.json())

app.use('/games', gamesRouters)

module.exports = app