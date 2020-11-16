const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, './config/.env')});
const cookieParser = require('cookie-parser');
const connectDB =require('./config/connectdb');

connectDB();

const port = process.env.PORT || 3000;

const app = express();

const authentication=require('./authentication/path/auth-routes');


const users=require('./users/path/users-routes');
const dashUsers=require('./dashboardUsers/path/dashUsers-routes');

const { testRouter } = require('./test/test-route');
const { articleRouter } = require('./article/article-route');
const { clubRouter } = require('./club/club-route');
const { commissionRouter} = require('./commission/commission-route');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/authentication',authentication)

app.use('/api/article', articleRouter);
app.use('/api/club', clubRouter);

app.use('/api/commission', commissionRouter);

app.use('/api/test', testRouter);
app.use('/api/article', articleRouter);

app.use('/api/users', users);
app.use('/api/dashboard/users', dashUsers);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

