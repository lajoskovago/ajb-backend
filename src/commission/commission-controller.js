const { CommissionModel } = require("./commission-model");

//Read

exports.findAll = (req, res) => {
  CommissionModel.find()
    .sort({
      title: -1
    })
    .then((clubs) => {
      res.status(200).send(commissions);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occured",
      });
    });
};

//Update
exports.updateCommission = (req, res) => {

  CommissionModel.findByIdAndUpdate(req.query.id, req.body, {
    new: true
  })
    .then((commission) => {
      if (!commission) {
        return res.status(404).send({
          message: "no commission found",
        });
      }
      res.status(200).send(commission);
    })
    .catch((err) => {
      return res.status(404).send({
        message: "error while updating the commission",
      });
    });
};

exports.create = (req, res) => {

  if (!req.body.id || !req.body.name) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }
  ComissionModel.create(req.body)

    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the comission.",
      });
    });
};



exports.remove = (req, res) => {
  
  ComissionModel.findByIdAndRemove(req.query.id)
    .then((comission) => {
      if (!comission) {
        return res.status(404).send({
          message: "Comission not found ",
        });
      }
      res.send({ message: "Comission deleted successfully!" });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete comission ",
      });
    });
};
