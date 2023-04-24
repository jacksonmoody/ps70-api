const express = require('express');
const cors=require("cors");
const Robot = require('./Robot');

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
  const xdata = req.body.x_coordinates;
  const ydata = req.body.y_coordinates;
  const pen = req.body.pen;
  const time = req.body.time;
  let coordinates = [];
  for (let i = 0; i < xdata.length; i++) {
    coordinates.push([xdata[i], ydata[i], pen[i]]);
  }
  const robbo = new Robot();
  const instructions = robbo.generateInstructions(coordinates);
  const output = {
    instructions: instructions,
    id: time
  }
  app.set('data', JSON.stringify(output));
  res.send(`Set data to ${app.get('data')}`);
})

app.listen(port, () => {
  console.log(`API Started On Port ${port}`);
})

module.exports = app;
