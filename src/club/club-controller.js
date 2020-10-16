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
