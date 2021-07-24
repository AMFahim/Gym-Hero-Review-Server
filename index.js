const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5500;


const app = express();
app.use(bodyParser.json());
app.use(cors());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cwf82.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const reviewCollection = client.db('gymHeroReview').collection('reviews');

  app.post('/addReview', (req, res) => {
    const review = req.body;
    reviewCollection.insertOne(review)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })

  app.get('/reviews', (req, res) => {
    reviewCollection.find()
    .toArray((err, reviews) =>{
      res.send(reviews)
    })

  })




})



app.get('/', (req, res) => {
  res.send('Hello World')
})


app.listen(port);