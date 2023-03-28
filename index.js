const express = require('express');
const app = express();
const port = 3000;

app.get('/direction', (req, res) => {
  res.send(app.get('direction'));
})

app.get('/speed', (req, res) => {
    res.send(app.get('speed'));
  })

app.post('/direction', (req, res) => {
  app.set('direction', req.query.direction);
    res.send(`Set direction to ${app.get('direction')}`);
})

app.post('/speed', (req, res) => {
    app.set('speed', req.query.speed);
    res.send(`Set speed to ${app.get('speed')}`);
})

app.listen(port, () => {
  console.log(`API Started On Port ${port}`);
})

module.exports = app;