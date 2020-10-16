//Read

const { ClubModel } = require("./club-model");

exports.findAll = (req, res) => {
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

exports.createAll = (req, res) => {
    ClubModel.create()
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

  exports.UpdateClub = (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.category) {
        return res.status(400).send({
            message: "required fields cannot be empty",
        });
    }
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

  exports.deleteAll = (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found ",
          });
        }
        res.send({ message: "User deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete user ",
        });
      });
  };



