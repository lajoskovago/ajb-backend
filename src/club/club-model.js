const { Schema, model } = require("mongoose");

const clubSchema = Schema({
    name: String,
    foundationDate: Date,
    description: String,
    logo: String,
    category: String,
    // players: [{name:String, varsta: int }],

});

exports.ClubModel = model('Club', clubSchema);