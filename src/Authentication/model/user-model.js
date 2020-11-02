const mongoose = require('mongoose')

const  UserInfoSchema = new mongoose.Schema({
       email: {
           type:String,
       },
       password: {
           type:String
       },
       role: {
           type:String,
           default:'customer'
       },
       createdAt: {
           type:Date,
           default:Date.now
       },

       resetPasswordToken: String,

},{ collection: 'users' } );

module.exports = mongoose.model('UserModel',UserInfoSchema)