const express = require('express');
const cors =  require ('cors');
const app = express();

const https = require('https');
const fs = require('graceful-fs')

const router = require('./router')

const hostname = '192.168.11.139';
const port = 4001;

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api', router);

// https
//   .createServer(
//     {
//       key: fs.readFileSync("server.key"),
//       cert: fs.readFileSync("server.cert"),
//     },
//     app
//   ).listen(port, hostname, () => {
//   console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
// })
app.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
})
;