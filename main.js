const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');


app.get('/', (req, res) => {
    res.send('Hello World!' + (17 * 5));
});

app.get('/blog-post', (req, res) => {
    res.send([{
        name: 'Blog post 1',
        // ...
    }]);
});

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
