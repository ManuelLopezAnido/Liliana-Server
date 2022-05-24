const db = require ('../config.js')

const abasTable = require('../../'+db+'/abastecimientoTable.json')
const abasUser = require('../../'+db+'/abastecimientoUsers.json')
const abasInputs = require ('../../'+db+'/abastecimientoInputs.json');


const fs = require('fs');
console.log ('db es:',db)
const getTable = (req,res)=>{
  res.send(abasTable)

}
const login = (req,res)=>{
  const loginData = req.body
  console.log('Login data: ',loginData)
  const index = abasUser.findIndex(lider => {
    return(
    lider.user===loginData.lider
    )
  })
  if (abasUser[index].password === "") {
    abasUser[index].password = loginData.contraseña
    fs.writeFile('../'+db+'/abastecimientoUsers.json',JSON.stringify(abasUser,null,2),function (err){
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
  console.log('Datos ingresado', abas)
  fs.writeFile('../'+db+'/abastecimientoInputs.json',JSON.stringify(abasInputs,null,2),function (err){
    if (err) throw (err);
  })
  let posIndex = abasTable.findIndex((pos)=>{
    return(pos.estanteria===abas.estanteria && pos.posicion===abas.posicion && pos.altura===abas.altura)
  })
  if (!abasTable[posIndex]){
    res.status(401).send({message:'La estanteria no existe!'})
    console.log('La estantería no existe')
  }
  else{
    console.log('Estanteria antes: ', abasTable[posIndex])
    abasTable[posIndex].time = abas.time
    abasTable[posIndex].date = abas.date
    abasTable[posIndex].radio = abas.radio
    abasTable[posIndex].comentarios = abas.comentarios
    switch (abas.radio){
      case 'add':
        //First looks if insmuos is empty
        if(!abasTable[posIndex].insumos[0].codigo){
          abasTable[posIndex].insumos=[]
        }
        //Second, look if it is already in the position
        const indexAdd = abasTable[posIndex].insumos.findIndex((insumo)=>{
          return(
            insumo.codigo === abas.codigo
          )
        })
        if (indexAdd === -1 || /^[V-Z]{1}$/.test(abas.estanteria)){
          abasTable[posIndex].insumos.push({
            ['codigo']:abas.codigo,
            ['cantidad']:abas.cantidad,
            ['comentarios']:abas.comentarios
          })
        } else {
          abasTable[posIndex].insumos[indexAdd].cantidad += abas.cantidad
          abasTable[posIndex].insumos[indexAdd].comentarios = abas.comentarios
        }
        break
      case 'replace':
        abasTable[posIndex].insumos=[{
          ['codigo']:abas.codigo,
          ['cantidad']:abas.cantidad,
          ['comentarios']:abas.comentarios
        }]
        break
      case 'down':
        //First, look if it is already in the position
        const indexDown = abasTable[posIndex].insumos.findIndex((insumo)=>{
          return(
            insumo.codigo === abas.codigo
          )
        })
        if (indexDown === -1){
          res.status(401).send({message:'Este insumo no se encuentra en la estanteria!'})
        } else {
          if (!abas.cantidad){
            const insumoToRemove = abasTable[posIndex].insumos[indexDown]
            abasTable[posIndex].insumos.splice(indexDown,1)
            res.status(200).send(insumoToRemove)
          } 
          else {
            abasTable[posIndex].insumos[indexDown].cantidad -= abas.cantidad
            if (abasTable[posIndex].insumos[indexDown].cantidad <= 0) {
              abasTable[posIndex].insumos.splice(indexDown,1)
            }
          }
          // if insumos got empty, push one empty object element
          if (!abasTable[posIndex].insumos.length){
            abasTable[posIndex].insumos.push({
              codigo:'',
              cantidad: 0
            })
          }
        }
        break
      case 'clean':
        abasTable[posIndex].insumos=[{
          codigo:'',
          cantidad: 0
        }]
        break
      default:
        res.status(401).send({message:'Ingreso no válido'})
    }
    console.log('La estanteria despues: ', abasTable[posIndex])
  }
  fs.writeFile('../'+db+'/abastecimientoTable.json',JSON.stringify(abasTable,null,2),function (err){
    if (err) throw (err);
  })
  res.send(abasTable[posIndex])
}

module.exports = {getTable, login, uploadInput}