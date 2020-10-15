const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose' );
const { testRouter } = require('./test/test-route');
const bodyParser = require('body-parser');
const { articleRouter } = require('./Article/article-route');
const { clubRouter } = require('./club/club-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/article', articleRouter);
app.use('/api/club', clubRouter);
  


app.use('/api/test', testRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

mongoose.connect('mongodb+srv://Sergiu:123@cluster0.6pyam.mongodb.net/ajb-backend?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.connection.on('error', (err) => {
    console.log(err);
})
mongoose.connection.on('open', () => {
    console.log('mongoose connected');
})
