const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
User : String,
Vote1 : String,
Vote2 : String,
Vote3 : String,
Vote4 : String,
Vote5 : String,
})
module.exports = mongoose.model('vote', Schema)