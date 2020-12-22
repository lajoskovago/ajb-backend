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
      res.status(200).send({
        data: commissions,
        error: null
      }
      );
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

  CommissionModel.findByIdAndUpdate(req.query.id, req.body, {
    new: true
  })
    .then((commission) => {
      if (!commission) {
        return res.status(404).send({
          error: "no commission found",
          data: null
        });
      }
      res.status(200).send({
        data: commission,
        error: null
      }
      );
    })
    .catch((err) => {
      return res.status(404).send({
        error: "error while updating the commission",
        data: null
      });
    });
};


exports.create = (req, res) => {

    CommissionModel.create(req.body)
    
        .then((commissions) => {
            res.status(200).send({
              data:commissions,
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

exports.remove = (req, res) => {

  CommissionModel.findByIdAndRemove(req.query.id)
    .then((commission) => {
      if (!commission) {
        return res.status(404).send({
          error: "Commission not found ",
          data: null
        });
      }
      res.send({
        data: commission,
        error: null
      });
    })
    .catch((err) => {
      return res.status(500).send({
        error: "Could not delete comission ",
        data: null
      });
    });
};