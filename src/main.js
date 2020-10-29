const express = require('express');
const bodyParser = require('body-parser');
const dotenv =require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config({path:'./src/config/.env'});
const connectDB =require('./config/connectdb')

connectDB();

const port = process.env.PORT || 3000;

const authentication=require('./Authentication/path/auth-routes');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/authentication',authentication)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

