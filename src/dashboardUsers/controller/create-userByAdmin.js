require("../../authentication/controller/passport-config");

const bcrypt = require("bcrypt");
const UserModel = require("../../authentication/model/user-model");

exports.createUser = () => async (req, res, next) => {
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
    
      const { firstname, lastname, email,password , phone, role } = req.body;
      const foundUser = await UserModel.findOne({ email });

      if (foundUser) {
        return res.status(400).json({
          error: "Sorry, but this email already exist!",
          data: []
        });
      } else {
        const passwordHash = await bcrypt.hash(password, hashConst);
        await UserModel.create({
          firstname,
          lastname,
          email,
          password:passwordHash,
          phone,
          role,
        });
        req.email = { email };
        next();
      }
    }
  }
};
