const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');

const mongoose = require('mongoose' );
const bodyParser = require('body-parser');
const dotenv =require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config({path:'./src/config/.env'});
const connectDB =require('./config/connectdb')

connectDB();

const port = process.env.PORT || 3000;

const app = express();

const authentication=require('./authentication/path/auth-routes');

const { testRouter } = require('./test/test-route');
const { articleRouter } = require('./article/article-route');
const { clubRouter } = require('./club/club-route');
const { commissionRouter} = require('./commission/commission-route');

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/v1/authentication',authentication)

app.use('/api/club', clubRouter);

app.use('/api/commission', commissionRouter);

app.use('/api/test', testRouter);
app.use('/api/article', articleRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

