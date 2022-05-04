const abasTable = require('../data samples/data2.json')
const abasUser = require('../data samples/abastecimientoUsers.json')
const abasInputs = require ('../data samples/abastecimientoInputs.json');

const fs = require('fs');

const getTable = (req,res)=>{
  res.send(abasTable)
}
const login = (req,res)=>{
  const loginData = req.body
  console.log('login data',loginData)
  const index = abasUser.findIndex(lider => {
    return(
    lider.user===loginData.lider
    )
  })
  console.log('index: ',index)
  console.log('password: ',abasUser[index].password)
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
}
const uploadInput = (req,res)=>{
  const abas = req.body
  abasInputs.push(abas)
  console.log(abas)
  fs.writeFile('./data samples/abastecimientoInputs.json',JSON.stringify(abasInputs,null,2),function (err){
    if (err) throw (err);
  })
  console.log(abasTable[3].estanteria)
  console.log(abas.estanteria)
  let posIndex = abasTable.findIndex((pos)=>{
    return(pos.estanteria===abas.estanteria && pos.posicion===abas.posicion && pos.altura===abas.altura)
  })
  console.log('index: ', posIndex)
  console.log(abasTable[posIndex])
  if (!abasTable[posIndex]){
    res.status(401).send({message:'La estanteria no existe!'})
  }else{
    if (abasTable[posIndex].codigo===abas.codigo){
      abasTable[posIndex].cantidad=abasTable[posIndex].cantidad + abas.cantidad
      abasTable[posIndex].time = abas.time
      abasTable[posIndex].date = abas.date
      if  (abasTable[posIndex].cantidad < 0){
        abasTable[posIndex].cantidad=0
      }
    }else{
      abasTable[posIndex].codigo = abas.codigo
      abasTable[posIndex].cantidad = abas.cantidad
      abasTable[posIndex].time = abas.time
      abasTable[posIndex].date = abas.date
    }
  }
  fs.writeFile('./data samples/abastecimientoTable.json',JSON.stringify(abasTable,null,2),function (err){
    if (err) throw (err);
  })
  res.send(abasTable[posIndex])
}

module.exports = {getTable, login, uploadInput}