const db = require ('../config.js')

const depoTable = require('../../'+db+'/depositoTable.json')
const depoUser = require('../../'+db+'/depositoUsers.json')
const depoInputs = require ('../../'+db+'/depositoInputs.json');


const fs = require('fs');
console.log ('db es:',db)
const getTable = (req,res)=>{
  res.send(depoTable)
}
const login = (req,res)=>{
  let depoUserRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/depositoUsers.json','utf8')
  let depoUser = JSON.parse(depoUserRaw)
  console.log('first user: ',depoUser[0])
  const loginData = req.body
  console.log('Login data: ',loginData)
  const index = depoUser.findIndex(lider => {
    return(
    lider.user===loginData.lider
    )
  })
  if (depoUser[index].password === "") {
    depoUser[index].password = loginData.contraseña
    fs.writeFile('../'+db+'/depositoUsers.json',JSON.stringify(depoUser,null,2),function (err){
      if (err) throw (err);
    })
    res.send(depoUser[index])
  } else if(depoUser[index].password === loginData.contraseña) {
    console.log('Contraseña correcta')
    res.send(depoUser[index])  
  } else {
    console.log('Contraseña incorrecta')
    res.status(401).send({message:'Contraseña incorrecta'})
  }
}
const uploadInput = (req,res)=>{
  const depo = req.body
  depoInputs.push(depo)
  depo.cantidad = (depo.cantidad || "")
  console.log('Datos ingresado', depo)
  fs.writeFile('../'+db+'/depositoInputs.json',JSON.stringify(depoInputs,null,2),function (err){
    if (err) throw (err);
  })
  let posIndex = depoTable.findIndex((pos)=>{
    return(pos.estanteria===depo.estanteria && pos.posicion===depo.posicion && pos.altura===depo.altura)
  })
  if (!depoTable[posIndex]){
    res.status(401).send({message:'La estanteria no existe!'})
    console.log('La estantería no existe')
  }
  else{
    console.log('Estanteria antes: ', depoTable[posIndex])
    depoTable[posIndex].time = depo.time
    depoTable[posIndex].date = depo.date
    depoTable[posIndex].radio = depo.radio
    depoTable[posIndex].comentarios = depo.comentarios
    switch (depo.radio){
      case 'add':
        //First looks if insmuos is empty
        if(!depoTable[posIndex].insumos[0].codigo){
          depoTable[posIndex].insumos=[]
        }
        //Second, look if it is already in the position
        const indexAdd = depoTable[posIndex].insumos.findIndex((insumo)=>{
          return(
            insumo.codigo === depo.codigo
          )
        })
        if (indexAdd === -1 || /^[V-Z]{1}$/.test(depo.estanteria)){
          depoTable[posIndex].insumos.push({
            ['codigo']:depo.codigo,
            ['cantidad']:depo.cantidad,
            ['comentarios']:depo.comentarios
          })
        } else {
          console.log(+depoTable[posIndex].insumos[indexAdd].cantidad , depo.cantidad )
          depoTable[posIndex].insumos[indexAdd].cantidad = +depoTable[posIndex].insumos[indexAdd].cantidad + depo.cantidad
          depoTable[posIndex].insumos[indexAdd].comentarios = depo.comentarios
        }
        break
      case 'replace':
        depoTable[posIndex].insumos=[{
          ['codigo']:depo.codigo,
          ['cantidad']:depo.cantidad,
          ['comentarios']:depo.comentarios
        }]
        break
      case 'down':
        //First, look if it is already in the position
        const indexDown = depoTable[posIndex].insumos.findIndex((insumo)=>{
          return(
            insumo.codigo === depo.codigo
          )
        })
        if (indexDown === -1){
          res.status(401).send({message:'Este insumo no se encuentra en la estanteria!'})
        } else {
          if (!depo.cantidad){
            const insumoToRemove = depoTable[posIndex].insumos[indexDown]
            depoTable[posIndex].insumos.splice(indexDown,1)
            res.status(200).send(insumoToRemove)
          } 
          else {
            depoTable[posIndex].insumos[indexDown].cantidad -= depo.cantidad
            if (depoTable[posIndex].insumos[indexDown].cantidad <= 0) {
              depoTable[posIndex].insumos.splice(indexDown,1)
            }
          }
          // if insumos got empty, push one empty object element
          if (!depoTable[posIndex].insumos.length){
            depoTable[posIndex].insumos.push({
              codigo:'',
              cantidad: 0
            })
          }
        }
        break
      case 'clean':
        depoTable[posIndex].insumos=[{
          codigo:'',
          cantidad: 0
        }]
        break
      default:
        res.status(401).send({message:'Ingreso no válido'})
    }
    console.log('La estanteria despues: ', depoTable[posIndex])
  }
  fs.writeFile('../'+db+'/depositoTable.json',JSON.stringify(depoTable,null,2),function (err){
    if (err) throw (err);
  })
  res.send(depoTable[posIndex])
}

module.exports = {getTable, login, uploadInput}