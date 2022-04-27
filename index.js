const express = require('express');
const cors =  require ('cors');
const fs = require('fs')
const app = express();

const dataProd = require ('./data samples/productionTable.json')
const piezasProd = require ('./data samples/piezas.json')
const armadoInputs = require ('./data samples/armadoInputs.json')
const armadoUsers = require('./data samples/armadoUsers.json');
const abasInputs = require ('./data samples/abastecimientoInputs.json');
const abasUser = require('./data samples/abastecimientoUsers.json')
const abasTable = require('./data samples/abastecimientoTable.json')
const hostname = '192.168.11.139';
const port = 4000;

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//----------------- PCP -----------------

app.get('/pcp',(req,res)=>{
  res.send(dataProd)
})

// ---------------- ABASTECIMIENTO ---------------- 

app.put('/abastecimiento/login',(req,res)=>{
  const loginData = req.body
  console.log('login data',loginData)
  const index = abasUser.findIndex(lider => {
    return(
    lider.user===loginData.lider
    )
  })
  console.log('index: ',index)
  console.log('password',abasUser[index].password)
  if (abasUser[index].password === "") {
    abasUser[index].password = loginData.contraseña
    fs.writeFile('./data samples/abastecimientoUsers.json',JSON.stringify(abasUser,null,2),function (err){
      if (err) throw (err);
    })
    res.send(abasUser[index])
  } else if(abasUser[index].password === loginData.contraseña) {
    console.log('Contraseña correcta')
    res.send(abasUser[index])  
  } else {
    console.log('Contraseña incorrecta')
    res.status(401).send({message:'Contraseña incorrecta'})
  }
})

app.put('/abastecimiento/relevamiento',(req,res)=>{
  const abas = req.body
  abasInputs.push(abas)
  console.log(abas)
  fs.writeFile('./data samples/abastecimientoInputs.json',JSON.stringify(abasInputs,null,2),function (err){
    if (err) throw (err);
  })
  res.send(abas)
})

app.get('/abastecimiento/tables',(req,res)=>{
  res.send(abasTable)
})
// ---------------- ARMADO ---------------- 

app.put('/armado/relevamiento',(req,res)=>{
  const siniestro = req.body
  armadoInputs.push(siniestro)
  console.log(siniestro)
  fs.writeFile('./data samples/armadoInputs.json',JSON.stringify(armadoInputs,null,2),function (err){
    if (err) throw (err);
  })
  res.send(siniestro)
})

app.put('/armado/login',(req,res)=>{
  const loginData = req.body
  console.log('login data',loginData)
  const index = armadoUsers.findIndex(lider => {
    return(
    lider.user===loginData.lider
    )
  })
  console.log('index: ',index)
  if (armadoUsers[index].password === '') {
    armadoUsers[index].password = loginData.contraseña
    fs.writeFile('./data samples/armadoUsers.json',JSON.stringify(armadoUsers,null,2),function (err){
      if (err) throw (err);
    })
    res.send(armadoUsers[index])
  } else if(armadoUsers[index].password === loginData.contraseña) {
    console.log('Contraseña correcta')
    res.send(armadoUsers[index])  
  } else {
    console.log('Contraseña incorrecta')
    res.status(401).send({message:'Contraseña incorrecta'})
  }
})

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end (JSON.stringify(data))
// });

app.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});