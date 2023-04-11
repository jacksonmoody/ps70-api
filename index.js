const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

app.get('/', (req, res) => {
  res.json(app.get('data'));
})

app.post('/', (req, res) => {
  console.log(req.body);
  app.set('data', req.body);
  res.send(`Set data to ${app.get('data')}`);
})

app.listen(port, () => {
  console.log(`API Started On Port ${port}`);
})

module.exports = app;
