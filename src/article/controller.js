const { ArticleModel } = require("./article-model");

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
      isActive: req.body.isActive,
      userType: req.body.userType,
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



  exports.delete = (req, res) => {
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



