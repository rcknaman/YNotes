
const express = require('express')
const mongoconnect=require('./db');
const app = express()
const port = 5000;
app.use(express.json());

var cors = require('cors');

app.use(cors());

mongoconnect();
app.use('/',require('./routes'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



