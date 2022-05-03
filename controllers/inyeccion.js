const dataProd = require ('../data samples/productionTable.json')
const inyeccionUser = require('../data samples/inyeccionUsers.json')

const fs = require('fs');

const getTable = (req,res)=>{
  res.send(dataProd)
}
const login = (req,res)=>{
  const loginData = req.body
  console.log('login data',loginData)
  const index = inyeccionUser.findIndex(lider => {
    return(
    lider.user===loginData.lider
    )
  })
  console.log('index: ',index)
  console.log('password',inyeccionUser[index].password)
  if (inyeccionUser[index].password === "") {
    inyeccionUser[index].password = loginData.contraseña
    fs.writeFile('./data samples/inyeccionUsers.json',JSON.stringify(inyeccionUser,null,2),function (err){
      if (err) throw (err);
    })
    res.send(inyeccionUser[index])
  } else if(inyeccionUser[index].password === loginData.contraseña) {
    console.log('Contraseña correcta')
    res.send(inyeccionUser[index])  
  } else {
    console.log('Contraseña incorrecta')
    res.status(401).send({message:'Contraseña incorrecta'})
  }
}
module.exports = { getTable, login }