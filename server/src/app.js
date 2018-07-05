const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

var data = '';
 
http.get('http://partnerapi.funda.nl/feeds/Aanbod.svc/json/detail/ac1b0b1572524640a0ecc54de453ea9f/koop/6289a7bb-a1a8-40d5-bed1-bff3a5f62ee6/', (resp) => {
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data);
  });
  //if there is an error, log it
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

//if a get for /posts is made, send the stored data
app.get('/posts', (req, res) => {
  res.send(
    [data]
  )
})

//listen for requests
app.listen(process.env.PORT || 8081)