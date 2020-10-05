//Read

const { ArticleModel } = require("./article-model");

exports.findAll = (req, res) => {
    ArticleModel.find()
        .sort({
            title: -1
        })
        .then((articles) => {
            res.status(200).send(articles);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error Occured",
            });
        });

};

//Update

exports.UpdateArticle = (req, res) => {
    if (!req.body.title || !req.body.subtitle || !req.body.content) {
        res.status(400).send({
            message: "required fields cannot be empty",
        });
    }
    ArticleModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then((article) => {
            if (!article) {
                return res.status(404).send({
                    message: "no article found",
                });
            }
            res.status(200).send(article);
        })
        .catch((err) => {
            return res.status(404).send({
                message: "error while updating the post",
            });
        });
};