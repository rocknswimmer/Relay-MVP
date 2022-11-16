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

app.get('/legs', (req, res) => {
  pool.query('select id, (select runner from runners where id = legs.runner) as runner, distance, complete, start_time, end_time, dif from legs', (err, data) => {
    if (err) {
      console.log('error retrieving legs from db: ', err);
      throw err;
    }
    res.send(data.rows);
  })
});

app.put('/:leg/complete', (req, res) => {

  pool.query('update legs set complete = not complete where id = $1 returning *;', [req.body.leg], (err, data) => {
    if (err) {
      console.log('error marknig leg complete: ', err);
      throw err;
    }
    res.send('updated leg status');
  })

});

app.put('/runner', (req, res) => {
  const {runner, phone, pace, runnerID} = req.body;

  pool.query('update runners set runner = $1, phone = $2, pace = $3  where id = $4 returning *;', [runner, phone, pace, runnerID], (err, data) => {
    if (err) {
      console.log('error updating runner info: ', err);
      throw err;
    }
    res.send('updated runner info');
  })

});

app.post('/runner/new', (req, res) => {
  const {runner, phone, pace} = req.body;
  pool.query('insert into runners (runner, phone, pace) values ($1, $2, $3) returning *;', [runner, phone, pace], (err, data) => {
    if (err) {
      console.log('error adding runner: ', err);
      throw err;
    }
    res.send('added new runner');
  })
})

app.put('/leg', (req, res) => {
  const {runner, distance, legID} = req.body;

  pool.query('update legs set runner = $1, distance = $2  where id = $3 returning *;', [runner, distance, legID], (err, data) => {
    if (err) {
      console.log('error updating leg info: ', err);
      throw err;
    }
    res.send('updated leg info');
  })
  // console.log(runner, distance, legID);
  // res.send('hitting server editing leg');

});

app.post('/leg/new', (req, res) => {
  const {runner, distance} = req.body;
  pool.query('insert into legs (runner, distance) values ($1, $2) returning *;', [runner, distance], (err, data) => {
    if (err) {
      console.log('error adding leg: ', err);
      throw err;
    }
    res.send('added new leg');
  })
  // console.log(runner, distance);
  // res.send('hitting server adding leg');
})




app.listen(3003);
console.log('Listening on port 3003');