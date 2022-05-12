const express = require('express');
const cors =  require ('cors');
const app = express();

const router = require('./router')

const hostname = '192.168.11.139';
const port = 4001;

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api', router);

app.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});