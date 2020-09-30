const { Schema, model } = require("mongoose");

const articleSchema = Schema({
    title: String,
    subtitle: String,
    description: String,
    image: String,
    content: String,
    category: String,
    tags: [String]
});

exports.ArticleModel = model('Article', articleSchema);