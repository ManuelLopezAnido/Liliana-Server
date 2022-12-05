require('dotenv').config();
const express = require('express');
const cors =  require ('cors');
const mongoose = require('mongoose');
const app = express();

const router = require('./router')

const hostname = '192.168.11.139';
const port =  process.env.PORT;

app.use(cors({
  origin: '*'
}));


const uri = process.env.DATABASE_URL;
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
.then(()=> console.log('Database conected successfully!'))
.catch((err) => console.log('Error trying to connect to the database: ', err))


app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api', router);

app.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
})
;