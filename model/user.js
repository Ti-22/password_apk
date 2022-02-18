const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: 'true',
        unique: true
    },

    website : {
        type: String,
//        required: 'true'
    },
     password: {
        type: String,
        required: 'true',
    },
    email : {
        type: String,
        required: 'true'
    }
    },{collection: 'user'})

const model = new mongoose.model('User', UserSchema)

module.exports = model