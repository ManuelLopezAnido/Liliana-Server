const express = require('express');
const cors =  require ('cors');
const fs = require('fs')
const app = express();

const router = require('./router')

const hostname = '192.168.11.139';
const port = 4000;

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api', router);

app.get('/pcp',(req,res)=>{
  res.send(dataProd)
})

app.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});