const UserModel = require('../model/user-model');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('../controller/passport-config');

exports.SendRecoverEmail = async(req,res,next) => {

        //searching for the user in the database
        const email = req.body.email;
        const user = await UserModel.findOne( { email } )

        if(!user){
          return res.status(400).json({
            error: "No user whit that email was found in the database",
            data: null
          })
        }

        //creating our jwt payload
        const recoverPayload = {
          secret: process.env.RECOVER_PAYLOAD_SECRET,
          expires: Date.now() + parseInt(process.env.JWT_RECOVER_EXPIRATION),
      };

       //creating our jwt token
      const token = jwt.sign(JSON.stringify(recoverPayload),process.env.RECOVER_TOKEN_SECRET);

       //saving the token on to the database
        user.resetPasswordToken = token;
        await user.save();

       //creating a nodemailer yahoo transporter
       const transporter = nodemailer.createTransport( {
       //un email pt test de pe EtherealMail
       //also need an actual email here
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        }
    });

        //creating the content of the mail
          var mailOptions = {
            to: user.email,
            from: 'passwordreset@demo.com',
            subject: 'AJB Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'https://ajbbihor.ro/Reset_password/' + user.resetPasswordToken + '\n\n' +//changed the Url
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          //sending the mail whit the mail options to the sender
          transporter.sendMail(mailOptions,(err) => {
            if(err){
              return res.json({
                error: err,
                data: null,
              });
            }else{
              next();
            }
          });
}



