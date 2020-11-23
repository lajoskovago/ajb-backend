let crypto = require('crypto');

//Read

const {ArticleModel} = require("./article-model");

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

exports.updateArticle = (req, res) => {
  if (!req.body.title || !req.body.subtitle || !req.body.content) {
    return res.status(400).send({
      message: "required fields cannot be empty",
    });
  }
  ArticleModel.findByIdAndUpdate(req.query.id, req.body, {
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

exports.create = (req, res) => {

  if (!req.body.title || !req.body.subtitle) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }
  ArticleModel.create(req.body)

    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Article.",
      });
    });
};



exports.deleteAll = (req, res) => {
  ArticleModel.findByIdAndRemove(req.query.id)
    .then((article) => {
      if (!article) {
        return res.status(404).send({
          message: "Article not found ",
        });
      }
      res.send({
        message: "Article deleted successfully!"
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete article ",
      });
    });
};

exports.uploadFile = (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {

      let photo = req.files.photo;
      let datetime = new Date();
      datetime.toISOString();

      let hash = crypto.createHash('sha256').update(photo.name + datetime.toISOString()).digest('hex');

      photo.name = hash + photo.name.substring(photo.name.indexOf('.'), photo.name.length);

      //move photo to uploads directory
      photo.mv('./uploads/' + photo.name);


      //return response
      res.send({

        error: null,

        data: {
          name: photo.name,
          mimetype: photo.mimetype,
          size: photo.size
        }
      });
    }
  } catch (err) {
    res.status(500).send({
      error: err,
      data: null
    });
  }
};