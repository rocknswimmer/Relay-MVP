const express = require('express');
const app = express();
const path = require('path');

//static method and url encoders
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/runners', (req, res) => {
  res.send('hitting server');
});



app.listen(3003);
console.log('Listening on port 3003');