const depositTable = require('../data samples/depositoTable.json')
const depositoUser = require('../data samples/depositoUsers.json')
const depositInputs = require ('../data samples/depositoInputs.json');

const fs = require('fs');

const getTable = (req,res)=>{
  // depositTable.forEach(user => {
  //   user.codigo=user.codigo.toUpperCase()
  // });
  // fs.writeFile('./data samples/depositoTable.json',JSON.stringify(depositTable,null,2),'utf-8',function (err){
    
  //   if (err) throw (err);
  // })
  res.send(depositTable)
}
const login = (req,res)=>{
  const  now = new Date()
  const loginData = req.body
  console.log('Login data: ',loginData,'Time: ', now.getHours() + ':' + now.getMinutes)
  const index = depositoUser.findIndex(lider => {
    return(
    lider.user===loginData.lider
    )
  })
  if (depositoUser[index].password === "") {
    depositoUser[index].password = loginData.contraseña
    fs.writeFile('./data samples/depositoUsers.json',JSON.stringify(depositoUser,null,2),function (err){
      if (err) throw (err);
    })
    res.send(depositoUser[index])
  } else if(depositoUser[index].password === loginData.contraseña) {
    console.log('Contraseña correcta')
    res.send(depositoUser[index])  
  } else {
    console.log('Contraseña incorrecta')
    res.status(401).send({message:'Contraseña incorrecta'})
  }
}

const uploadInput = (req,res)=>{
  const deposit = req.body
  depositInputs.push(deposit)
  console.log('Entry inputs data',deposit)
  fs.writeFile('./data samples/depositoInputs.json',JSON.stringify(depositInputs,null,2),function (err){
    if (err) throw (err);
  })
  let posIndex = depositTable.findIndex((pos)=>{
    return(pos.estanteria===deposit.estanteria && pos.posicion===deposit.posicion)
  })
  if (!depositTable[posIndex]){
    res.status(401).send({message:'La estanteria no existe!'})
    console.log('La estantería no existe')
  }
  else{
    console.log('Estanteria antes: ', depositTable[posIndex])
    depositTable[posIndex].time = deposit.time
    depositTable[posIndex].date = deposit.date
    depositTable[posIndex].comentarios = deposit.comentarios
    if (!deposit.cantidad && deposit.radio === 'Baja'){
      depositTable[posIndex].codigo = ""
      depositTable[posIndex].cantidad = 0
    } 
    else if (depositTable[posIndex].codigo === deposit.codigo){
      depositTable[posIndex].cantidad = +depositTable[posIndex].cantidad + deposit.cantidad
      if  (depositTable[posIndex].cantidad < 0){
        depositTable[posIndex].cantidad = 0
      }
    }
    else{
      depositTable[posIndex].codigo = deposit.codigo
      depositTable[posIndex].cantidad = deposit.cantidad
    }
    console.log('Estanteria despues: ', depositTable[posIndex])
  }
  fs.writeFile('./data samples/depositoTable.json',JSON.stringify(depositTable,null,2),function (err){
    if (err) throw (err);
  })
  res.send(depositTable[posIndex])
}

module.exports = {getTable, login, uploadInput}