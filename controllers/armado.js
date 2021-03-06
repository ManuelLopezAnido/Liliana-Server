const db = require ('../config.js')

const armadoInputs = require ('../../'+db+'/armadoInputs.json')

const fs = require('fs');

const getUsers = (req, res) => {
  let usersRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/armadoUsers.json','utf8')
  let users = JSON.parse(usersRaw)
  res.send(users)
}

const getProductos = (req,res) => {
  let productosRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/productos.json','utf8')
  let productos = JSON.parse(productosRaw)
  res.send(productos)
}

const getInputs = (req,res) => {
  let inputsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/armadoInputs.json','utf8')
  let inputs = JSON.parse(inputsRaw)
  res.send(inputs)
}


const uploadInputs = (req,res)=>{
  let armadoInputsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/armadoInputs.json','utf8')
  let armadoInputs = JSON.parse(armadoInputsRaw)

  const siniestro = req.body
  armadoInputs.push(siniestro)
  console.log(siniestro)
  fs.writeFile('../'+db+'/armadoInputs.json',JSON.stringify(armadoInputs,null,2),function (err){
    if (err) throw (err);
  })
  res.send(siniestro)
}
const login = (req,res)=>{
  let armadoUserRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/armadoUsers.json','utf8')
  let armadoUsers = JSON.parse(armadoUserRaw)

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
    fs.writeFile('../'+db+'/armadoUsers.json',JSON.stringify(armadoUsers,null,2),function (err){
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
}

module.exports = {uploadInputs, login, getUsers, getProductos, getInputs}