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