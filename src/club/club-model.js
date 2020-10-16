const { Schema, model } = require("mongoose");

const clubSchema = Schema({
    name: String,
    description: String,
    city: String,
    startDate: Date,
    colors: String,
    logo: String,
    
});

exports.ClubModel = model('Club', clubSchema);