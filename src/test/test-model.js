const { Schema, model } = require("mongoose");

const testSchema = new Schema({
    name: String,
    description: String
});

exports.TestModel = model('Test', testSchema);