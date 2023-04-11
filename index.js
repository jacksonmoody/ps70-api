const express = require('express');
const cors=require("cors");
const app = express();
const port = 3000;

app.use(express.json());

const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

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
