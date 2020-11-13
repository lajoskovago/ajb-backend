const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');
const app = express();
const port = 3000;

const mongoose = require('mongoose' );
const { testRouter } = require('./test/test-route');
const bodyParser = require('body-parser');
const { articleRouter } = require('./Article/article-route');
const { clubRouter } = require('./club/club-route');
const { commissionRouter} = require('./commission/commission-route');

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/club', clubRouter);
  
app.use('/api/commission', commissionRouter);

app.use('/api/test', testRouter);
app.use('/api/article', articleRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// app.post('/upload-avatar', async (req, res) => {
//     try {
//         if(!req.files) {
//             res.send({
//                 status: false,
//                 message: 'No file uploaded'
//             });
//         } else {
//             //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
//             let avatar = req.files.avatar;
            
//             //Use the mv() method to place the file in upload directory (i.e. "uploads")
//             avatar.mv('./uploads/' + avatar.name);

//             //send response
//             res.send({
//                 status: true,
//                 message: 'File is uploaded',
//                 data: {
//                     name: avatar.name,
//                     mimetype: avatar.mimetype,
//                     size: avatar.size
//                 }
//             });
//         }
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

// app.post('/upload-photos', async (req, res) => {
//     try {
//         if(!req.files) {
//             res.send({
//                 status: false,
//                 message: 'No file uploaded'
//             });
//         } else {
//             let data = []; 
    
//             //loop all files
//             _.forEach(_.keysIn(req.files.photos), (key) => {
//                 let photo = req.files.photos[key];
                
//                 //move photo to uploads directory
//                 photo.mv('./uploads/' + photo.name);

//                 //push file details
//                 data.push({
//                     name: photo.name,
//                     mimetype: photo.mimetype,
//                     size: photo.size
//                 });
//             });
    
//             //return response
//             res.send({
//                 status: true,
//                 message: 'Files are uploaded',
//                 data: data
//             });
//         }
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });


mongoose.connect('mongodb+srv://Sergiu:123@cluster0.6pyam.mongodb.net/ajb-backend?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.connection.on('error', (err) => {
    console.log(err);
})
mongoose.connection.on('open', () => {
    console.log('mongoose connected');
})
