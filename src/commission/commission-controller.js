const { CommissionModel } = require("./commission-model");

//Read

exports.findOne = (req, res) => {
  CommissionModel.findById(req.query.id)
    .then((comission) => {
      if (!comission) {
        return res.status(404).send({
          error: "no comission found",
          data:null
        });
      }
      res.status(200).send({
        data:comission,
        error: null
      });
      console.log(comission);
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

  if (!req.body.title || !req.body.subtitle){
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }
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