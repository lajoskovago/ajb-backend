//Read

const { ClubModel } = require("./club-model");

exports.findOne = (req, res) => {
  ClubModel.findById(req.query.id)
    .then((club) => {
      if (!club) {
        return res.status(404).send({
          error: "no club found",
          data:null
        });
      }
      res.status(200).send({
        data:club,
        error: null
      });
      console.log(club);
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
    ClubModel.find()
    .sort({
        title: -1
    })
    .then((clubs) => {
        res.status(200).send(clubs);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Error Occured",
        });
    });
};


exports.create = (req, res) => {

    if (!req.body.email || !req.body.password || !req.body.name) {
      return res.status(400).send({
        message: "Required field can not be empty",
      });
    }
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
    });
    user
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the User.",
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
                    message: "no club found",
                });
            }
            res.status(200).send(club);
        })
        .catch((err) => {
            return res.status(404).send({
                message: "error while updating the club",
            });
        });
};

  exports.remove = (req, res) => {
    ClubModel.findByIdAndRemove(req.query.id)
      .then((club) => {
        if (!club) {
          return res.status(404).send({
            message: "Club not found ",
          });
        }
        res.send({ message: "User deleted successfully!" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send({
          message: "Could not delete club ",
        });
      });
  };



