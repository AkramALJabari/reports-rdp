const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
User : String,
Status : String,
Channel_Id : String,
R_Number : String,
R_Info : String,
})
module.exports = mongoose.model('ticket', Schema)