const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

//static method and url encoders
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/runners', (req, res) => {
  pool.query('select * from runners', (err, data) => {
    if (err) {
      console.log('error retrieving runners from db: ', err);
      throw err;
    }
    res.send(data.rows);
  })
});



app.listen(3003);
console.log('Listening on port 3003');