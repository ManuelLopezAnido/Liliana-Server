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
  console.log('serving deposit table')
  res.send(depositTable)
}
const login = (req,res)=>{
  const loginData = req.body
  console.log('login data',loginData)
  const index = depositoUser.findIndex(lider => {
    return(
    lider.user===loginData.lider
    )
  })
  console.log('index: ',index)
  console.log('password',depositoUser[index].password)
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
  console.log(deposit)
  fs.writeFile('./data samples/depositoInputs.json',JSON.stringify(depositInputs,null,2),function (err){
    if (err) throw (err);
  })
  console.log('table: ',depositTable[3].estanteria)
  console.log('estanteria: ',deposit.estanteria)
  let posIndex = depositTable.findIndex((pos)=>{
    return(pos.estanteria===deposit.estanteria && pos.posicion===deposit.posicion && pos.altura===deposit.altura)
  })
  console.log('index: ', posIndex)
  console.log(depositTable[posIndex])
  if (!depositTable[posIndex]){
    res.status(401).send({message:'La estanteria no existe!'})
  }else{
    depositTable[posIndex].time = deposit.time
    depositTable[posIndex].date = deposit.date
    if (!deposit.cantidad && deposit.radio === 'Baja'){
      depositTable[posIndex].codigo = ""
      depositTable[posIndex].cantidad = 0
    }
    else if (depositTable[posIndex].codigo === deposit.codigo){
      console.log('NUMERO cantidad: ', deposit.cantidad)
      console.log(depositTable[posIndex].cantidad)
      console.log(parseInt(depositTable[posIndex].cantidad) + deposit.cantidad)
      depositTable[posIndex].cantidad = +depositTable[posIndex].cantidad + deposit.cantidad
      console.log('NUMERO: ', depositTable[posIndex].cantidad)
      if  (depositTable[posIndex].cantidad < 0){
        depositTable[posIndex].cantidad = 0
      }
    }
    else{
      depositTable[posIndex].codigo = deposit.codigo
      depositTable[posIndex].cantidad = deposit.cantidad
    }
  }
  fs.writeFile('./data samples/depositoTable.json',JSON.stringify(depositTable,null,2),function (err){
    if (err) throw (err);
  })
  res.send(depositTable[posIndex])
}

module.exports = {getTable, login, uploadInput}