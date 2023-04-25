const express = require('express');
const cors=require("cors");
const Robot = require('./Robot');

const app = express();
const port = 3000;
let output = {
  instructions: [],
  id: 0
}

let current_gyro = {
  x: 0,
  y: 0,
  z: 0
}

app.use(express.json());

const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.use(cors(corsOptions))

app.post('/gyro', (req, res) => {
  let euler_x = req.body.euler_x * 180 / Math.PI;
  let euler_y = req.body.euler_y * 180 / Math.PI;
  let euler_z = req.body.euler_z * 180 / Math.PI;
  current_gyro = {
    x: euler_x,
    y: euler_y,
    z: euler_z,
  }
  res.send(`Set gyro to ${current_gyro}`);
});

app.get('/gyro', (req, res) => {
  res.send(current_gyro);
});

app.get('/', (req, res) => {
  res.send(output);
})

app.post('/', (req, res) => {
  console.log(req.body);
  const xdata = req.body.x_coordinates;
  const ydata = req.body.y_coordinates;
  const pen = req.body.pen;
  //const time = req.body.time;
  let coordinates = [];
  for (let i = 0; i < xdata.length; i++) {
    coordinates.push([xdata[i] * 2, ydata[i] * 2, pen[i]]);
  }
  const robbo = new Robot();
  const instructions = robbo.generateInstructions(coordinates);
  let t = getRandomInt(0, 10000);

  if (req.body.circle) {
    t = t * -1;
    output = {
      instructions: instructions,
      id: t
    }
  } else {
    output = {
      instructions: instructions,
      id: t
    }
  }
  res.send(`Set data to ${output}`);
})

app.listen(port, () => {
  console.log(`API Started On Port ${port}`);
})

module.exports = app;
