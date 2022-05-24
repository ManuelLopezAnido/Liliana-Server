const db = require ('../config.js')

const armadoUsers = require('../../'+db+'/armadoUsers.json');
const armadoInputs = require ('../../'+db+'/armadoInputs.json')

const fs = require('fs');

const uploadInputs = (req,res)=>{
  const siniestro = req.body
  armadoInputs.push(siniestro)
  console.log(siniestro)
  fs.writeFile('../'+db+'/armadoInputs.json',JSON.stringify(armadoInputs,null,2),function (err){
    if (err) throw (err);
  })
  res.send(siniestro)
}
const login = (req,res)=>{
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

module.exports = {uploadInputs, login}