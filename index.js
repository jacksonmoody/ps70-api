const express = require('express');
const app = express();
const port = 3000;

let direction;
let speed;

app.get('/direction', (req, res) => {
  res.send(direction);
})

app.get('/speed', (req, res) => {
    res.send(speed);
  })

app.post('/direction', (req, res) => {
    direction = req.query.direction;
    res.send(direction);
})

app.post('/speed', (req, res) => {
    speed = req.query.speed;
    res.send(speed);
})

app.listen(port, () => {
  console.log(`API Started On Port ${port}`);
})

module.exports = app;