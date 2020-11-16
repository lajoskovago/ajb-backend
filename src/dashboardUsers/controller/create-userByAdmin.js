require("../../authentication/controller/passport-config");

const bcrypt = require("bcrypt");
const UserModel = require("../../authentication/model/user-model");

exports.createAnUser = () => async (req, res, next) => {
  {
    const hashConst = 10;

    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        error: "Email and password fields are required!",
        data: []
      });
    } else {
      if (!req.body.role) {
        req.body.role = process.env.DEFAULT_ROLE;
      }
      var { password } = req.body;
      const { name, firstname, email, phone, role } = req.body;
      const foundUser = await UserModel.findOne({ email });
      password = await bcrypt.hash(password, hashConst);

      if (foundUser) {
        return res.status(400).json({
          error: "Sorry, but this email is already exist!",
          data: []
        });
      } else {
        await UserModel.create({
          name,
          firstname,
          email,
          password,
          phone,
          role,
        });
        req.email = { email };
        next();
      }
    }
  }
  req, res;
};
