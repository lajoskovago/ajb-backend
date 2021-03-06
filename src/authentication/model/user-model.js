const mongoose = require('mongoose')

const  UserInfoSchema = new mongoose.Schema({
    firstname: {
        type:String,
    },
     lastname: {
        type:String,
    },
       email: {
           type: String,
       },
       phone: {
        type:String,
    },
       password: {
           type: String
       },
       role: {
           type: String,
           default: 'customer'
       },
       createdAt: {
           type: Date,
           default: Date.now
       },

       resetPasswordToken: String,

},{ collection: 'users' } );

module.exports = mongoose.model('UserModel',UserInfoSchema)