const bcrypt = require("bcrypt");
const UserModel = require("../../authentication/model/user-model");

exports.createUser = () => async (req, res, next) => {
  {
    const hashConst = 10;
    const { firstname, lastname, email, password , phone } = req.body;
    let { role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password fields are required!",
        data: []
      });
    } else {
      if (!role) {
        role = process.env.DEFAULT_ROLE;
      }
    
      const foundUser = await UserModel.findOne({ email });

      if (foundUser) {
        return res.status(400).json({
          error: "Sorry, but this email already exists!",
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
