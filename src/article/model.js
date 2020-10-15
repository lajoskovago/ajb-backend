const { Schema, model } = require("mongoose");

const articleSchema = Schema({
    title:String,
    subtitle: String, 
    content: String,
    image: String
});

exports.ArticleModel = model('Article', articleSchema);