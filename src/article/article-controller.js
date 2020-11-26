let crypto = require('crypto');

//Read

const { ArticleModel } = require("./article-model");

exports.findOne = (req, res) => {
  ArticleModel.findById(req.query.id)
    .then((article) => {
      if (!article) {
        return res.status(404).send({
          error: "no article found",
          data:null
        });
      }
      res.status(200).send({
        data:article,
        error: null
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({
        error: "Error Occured",
        data:null
      });
    });
};



exports.list = (req, res) => {
  ArticleModel.find()
    .sort({
      title: -1
    })
    .then((articles) => {
      res.status(200).send({
        data: articles,
        error: null
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error Occured",
        data: null
      });
    });

};

//Update

exports.update = (req, res) => {
  if (!req.body.title || !req.body.subtitle || !req.body.content) {
    return res.status(400).send({
      error: "required fields cannot be empty",
      data: null
    });
  }
  ArticleModel.findByIdAndUpdate(req.query.id, req.body, {
    new: true
  })
    .then((article) => {
      if (!article) {
        return res.status(404).send({
          error: "no article found",
          data: null
        });
      }
      res.status(200).send({
        data: article,
        error: null
      });
    })
    .catch((err) => {
      return res.status(404).send({
        error: "error while updating the post",
        data: null
      });
    });
}

exports.create = (req, res) => {

  if (!req.body.title || !req.body.subtitle) {
    return res.status(400).send({
      error: "Required field can not be empty",
      data: null
    });
  }
  ArticleModel.create(req.body)
    .then((data) => {
      res.send({
        data:article,
        error: null
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: "Some error occurred while creating the Article.",
        data: null
      });
    });
};

exports.remove = (req, res) => {
  ArticleModel.findByIdAndRemove(req.query.id)
    .then((article) => {
      if (!article) {
        return res.status(404).send({
          error: "Article not found ",
          data: null
        });
      }
      res.send({
        data: article,
        error: null
      });
    })
    .catch((err) => {
      return res.status(500).send({
        error: "Could not delete article ",
        data: null
      });
    })
}


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