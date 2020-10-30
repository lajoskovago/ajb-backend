const UserModel=require('../model/UserModel');
const nodemailer=require('nodemailer');
const jwt = require('jsonwebtoken');
require('../controller/passport-config');
const dotenv=require('dotenv');
dotenv.config({path:'./src/config/.env'});

exports.SendRecoverEmail=async(req,res,next) => {

        //checking if the email is in the database
        const email=req.body.email;
        const User = await UserModel.findOne({ email })
        if(!User){
            return res.status(404).send({ error: 'No user whit that email' });
        }

        //creating our jwt payload
        const recoverPayload ={
          secret:process.env.RECOVER_PAYLOAD_SECRET,
          expires:Date.now() + parseInt(process.env.JWT_RECOVER_EXPIRATION),
      };

       //creating our jwt token
      const token=jwt.sign(JSON.stringify(recoverPayload),process.env.RECOVER_TOKEN_SECRET);

       //saving the token on to the database
        User.resetPasswordToken = token;
        await User.save();

       //creating a nodemailer yahoo transporter
       const transporter = nodemailer.createTransport({
       //un email pt test de pe EtherealMail
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        }
    });

        //creating the content of the mail
          var mailOptions = {
            to: User.email,
            from: 'passwordreset@demo.com',
            subject: 'AJB Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/api/v1/authentication/Reset/' + User.resetPasswordToken + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };

          //sending the mail whit the mail options to the sender
          transporter.sendMail(mailOptions,(err,data)=>{
            if(err){
              return res.send(`this is your error:${err}`);
            }else{
              next();
            }
          });
}



