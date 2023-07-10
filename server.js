import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors';
import Data from './data.js'
import Videos from './dbModel.js';

//app config
const app = express();
dotenv.config()

//middleware
app.use(cors())
app.use(express.json());
// app.use((req, res, next) => {
//     res.setHeaders("Allow-Control-Allow-Origin", "*"),
//     res.setHeaders("Access-Control-Allow-Headers","*"),
//     next();
// })
//DB config & listen
const port = process.env.PORT || 9001;
mongoose.connect(process.env.mongodb)
    .then(() => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        }) 
        console.log("connected to mongodb successfully");
    })
    .catch(error => {
        console.log(error);
    })
        
//api endpoints
app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
})

app.get('/v1/posts', (req, res) => {
    res.status(200).send(Data)
})

app.post('/v2/posts', (req, res) => {
    //POST request is to ADD DATA to the database
    // It will let us ADD a video DOCUMENT to the videos COLLECTION
    const dbVideos = req.body;

    Videos.create(dbVideos)
            .then(data => {
                res.status(201).send(data);
            })
            .catch(error => {
                res.status(500).send(error);
            })
})

app.get('/v2/posts', (req, res) => {
    Videos.find()
            .then( data => {
                res.status(200).send(data);
            })
            .catch(error => {
                res.status(500).send(error);
            })
})
app.get('/v2/posts', (req, res) => {
    Videos.find()
            .then( data => {
                res.status(200).send(data);
            })
            .catch(error => {
                res.status(500).send(error);
            })
})
//5:14
//deployment to heroku notes