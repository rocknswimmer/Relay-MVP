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
  password: process.env.PGPASSWORD
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/runners', (req, res) => {
  pool.query('select * from runners', (err, data) => {
    if (err) {
      console.log('error retrieving runners from db: ', err);
    }
    res.send(data.rows);
  })
});

app.get('/legs1', (req, res) => {
  pool.query('select id, (select runner from runners where id = legs1.runner) as runner, (select pace from runners where id = legs1.runner) as pace, distance, complete, start_time, end_time, pacific_start, pacific_end, dif, runner as runner_id from legs1', (err, data) => {
    if (err) {
      console.log('error retrieving legs from db: ', err);
    }
    res.send(data.rows);
  })
});

app.put('/:leg/complete1', (req, res) => {

  pool.query('update legs1 set complete = not complete where id = $1 returning *;', [req.body.leg], (err, data) => {
    if (err) {
      console.log('error marknig leg1 complete: ', err);
    }
    res.send('updated leg1 status');
  })

});

app.put('/time1', (req, res) => {
  const {start_time, end_time, pacific_start, pacific_end, legID} = req.body;

  pool.query('update legs1 set start_time = $1, end_time = $2, pacific_start = $3, pacific_end = $4 where id = $5 returning *;', [start_time, end_time, pacific_start, pacific_end, legID], (err, data) => {
    if (err) {
      console.log('error updating leg time info: ', err, pacific_start);
    }
    res.send(data);
  })
})

app.put('/dif1', (req, res) => {
  const {dif, legID} = req.body;

  pool.query('update legs1 set dif = $1 where id = $2 returning *;', [dif , legID], (err, data) => {
    if (err) {
      console.log('error updating leg1 dif info: ', err);
    }
    res.send(data);
  })
})

app.listen(3008);
console.log('Listening on port 3008');