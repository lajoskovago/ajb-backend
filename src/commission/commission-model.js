const { Schema, model } = require("mongoose");

const commissionSchema = Schema({
    name: String,
    email: String,
    phoneNumber: String

});

exports.CommissionModel = model('Commission', commissionSchema);