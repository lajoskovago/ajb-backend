//Read

const { ClubModel } = require("./club-model");


exports.list = (req, res) => {
  ClubModel.find()
    .sort({
      title: -1
    })
    .then((clubs) => {
      let output={
        data:clubs,
        error:null
      };
      res.status(200).send(output);
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error Occured",
        data:null
      });
    });
};

exports.create = (req, res) => {
  ClubModel.create(req.body)

    .then((clubs) => {
      let output={
        data:clubs,
        error:null
      }
      res.status(200).send(output);
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error Occured",
        data:null
      });
    });
};

exports.update = (req, res) => {

  ClubModel.findByIdAndUpdate(req.query.id, req.body, {
    new: true
  })
    .then((club) => {
      if (!club) {
        return res.status(404).send({
          error: "no club found",
          data:null
        });
      }
      let output={
        data:club,
        error:null
      }
      res.status(200).send(output);
    })
    .catch((err) => {
      return res.status(404).send({
        error: "error while updating the club",
        data:null
      });
    });
};

exports.remove = (req, res) => {
  ClubModel.findByIdAndRemove(req.query.id)
    .then((club) => {
      if (!club) {
        return res.status(404).send({
          error: "Club not found ",
          data:null

        });
      }
      res.send({ data:club,
        error:null
       });
    })
    .catch((err) => {
      return res.status(500).send({
        error: "Could not delete club ",
        data:null
      });
    });
};



