const { CommissionModel } = require("./commission-model");

//Read

exports.list = (req, res) => {
  CommissionModel.find()
    .sort({
      title: -1
    })
    .then((commissions) => {
      res.status(200).send(commissions);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occured",
      });
    });
};

//Update
exports.update = (req, res) => {

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
  CommissionModel.create(req.body)

    .then((commissions) => {
      res.status(200).send(commissions);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Occured",
      });
    });
};



exports.remove = (req, res) => {

  CommissionModel.findByIdAndRemove(req.query.id)
    .then((commission) => {
      if (!commission) {
        return res.status(404).send({
          message: "Commission not found ",
        });
      }
      res.send({ message: "Commission deleted successfully!" });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete comission ",
      });
    });
};