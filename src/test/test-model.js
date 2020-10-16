const { Schema, model } = require("mongoose");

const content = new Content({
    name: String,
    description: String
});

const title = new Title({
    name: String,
    description: String
});

const subtitle = new Subtitle({
    name: String,
    description: String
});

const image = new image({
    name: String,
    description: String
});


exports.TestModel = model('Test', testSchema);