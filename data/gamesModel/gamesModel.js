const db = require('../dbconfig')

module.exports = {
    add,
    getAll
}

const tblName = 'games'

function add(game) {
    return db(tblName).insert(game)
}

function getAll() {
    return db(tblName)
}