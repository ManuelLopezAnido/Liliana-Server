const db = require ('../config.js')
const fs = require('graceful-fs');


const backup = () => {
  let tableRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/depositoTable.json','utf8')
  let table = JSON.parse(tableRaw)
  fs.writeFile('../backup/depoTable.json',JSON.stringify(table,null,2),function (err){
    if (err) throw (err);
  })
  let inputsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/depositoInputs.json','utf8')
  let inputs = JSON.parse(inputsRaw)
  fs.writeFile('../backup/depoInputs.json',JSON.stringify(inputs,null,2),function (err){
    if (err) throw (err);
  })
}

if (db === 'data samples' ) {
  setInterval(backup,1000*3600)
}


const getTable = (req,res)=>{
  let tableRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/depositoTable.json','utf8')
  let table = JSON.parse(tableRaw)
  res.send(table)
}
// const getPiezas = (req, res) => {
//   let piezasRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/piezasDeposito.json','utf8')
//   let piezas = JSON.parse(piezasRaw)
//   res.send(piezas)
// }
// const newPz = (req,res) => {
//   const newPz = req.body
//   let piezasRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/piezasDeposito.json','utf8')
//   let piezas = JSON.parse(piezasRaw)
//   const found = piezas.findIndex (pz => {
//     return pz.articulo === newPz.codigo
//   });
//   if (found !== -1 ){
//     res.status(401).send({message:'LA PIEZA YA EXISTE'})
//     return
//   }
//   piezas.push({
//     "articulo": newPz.codigo,
//     "detalle": newPz.detalle,
//     "familia": newPz.familia,
//     "cantxPallet": newPz.cantxPallet,
//     "stockM": newPz.stockM
//   })
//   fs.writeFile('../'+db+'/piezasDeposito.json',JSON.stringify(piezas,null,2),function (err){
//     if (err) throw (err);
//   })
//   res.status(200).send({message:'Pieza cargada con éxito!'})
// }
// const getUsers = (req, res) => {
//   let usersRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/depositoUsers.json','utf8')
//   let users = JSON.parse(usersRaw)
//   res.send(users)
// }
// const newWorker = (req,res) => {
//   const newUser = req.body
//   let depoUserRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/depositoUsers.json','utf8')
//   let depoUser = JSON.parse(depoUserRaw)
//   const found = depoUser.findIndex (user => {
//     return user.user === newUser.nombreOpe
//   });
//   if (found !== -1 ){
//     console.log('El usuario ya existe')
//     res.status(401).send({message:'EL USUARIO YA EXISTE'})
//     return
//   }
//   depoUser.push(
//     {
//       "user": newUser.nombreOpe,
//       "shift": newUser.turno,
//       "password": ""
//     }
//   )
//   fs.writeFile('../'+db+'/depositoUsers.json',JSON.stringify(depoUser,null,2),function (err){
//     if (err) throw (err);
//   })
//   res.status(200).send({message:'Usuario cargado con éxito!'})
// }

const login = (req,res)=>{
  let depoUserRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/data/depositoUsers.json','utf8')
  let depoUser = JSON.parse(depoUserRaw)
  const loginData = req.body
 
  const index = depoUser.findIndex(lider => {
    return(
    lider.user===loginData.lider
    )
  })
  if (depoUser[index].password === "") {
    depoUser[index].password = loginData.contraseña
    fs.writeFile('../'+db+'/data/depositoUsers.json',JSON.stringify(depoUser,null,2),function (err){
      if (err) throw (err);
    })
    res.send(depoUser[index])
  } else if(depoUser[index].password === loginData.contraseña) {
    console.log('Contraseña correcta: ',loginData.lider)
    res.send(depoUser[index])  
  } else {
    console.log('Contraseña incorrecta')
    res.status(401).send({message:'Contraseña incorrecta'})
  }
}
const uploadInput = (req,res)=>{
  let depoTableRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/depositoTable.json','utf8')
  let depoTable = JSON.parse(depoTableRaw)
  let inputsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/depositoInputs.json','utf8')
  let inputs = JSON.parse(inputsRaw)
  
  const depo = req.body
  inputs.push(depo)
  depo.cantidad = (depo.cantidad || "")
  console.log('Datos ingresado', depo)
  fs.writeFile('../'+db+'/depositoInputs.json',JSON.stringify(inputs,null,2),function (err){
    if (err) throw (err);
  })
  let posIndex = depoTable.findIndex((pos)=>{
    return(pos.estanteria===depo.estanteria && pos.posicion===depo.posicion && pos.altura===depo.altura)
  })
  if (!depoTable[posIndex]){
    console.log('La estantería no existe')
    res.status(401).send({message:'La estanteria no existe!'})
    return
  }
  else{
   
    depoTable[posIndex].time = depo.time
    depoTable[posIndex].date = depo.date
    depoTable[posIndex].radio = depo.radio
    depoTable[posIndex].comentarios = depo.comentarios
    
    switch (depo.radio){
      case 'add':
        //First look the amount of elements
        let maxAmount = 100
        switch(depo.estanteria){
          case 'A':
          case 'B':
            maxAmount = 4;
            break;
          case 'E':
          case 'C': 
            maxAmount = 8;
            break;
          case 'G':
            maxAmount = 7;
            break;
          case 'H':
            maxAmount = 3;
            break;
        }
        if (depoTable[posIndex].insumos.length > maxAmount){
          console.log('La estantería llego a su capcidad maxima de ' + maxAmount + ' unidades')
          res.status(401).send({message:'La estantería llego a su capcidad maxima de ' + maxAmount + ' unidades'})
          return
        }

        //Second looks if insmuos is empty
        if(!depoTable[posIndex].insumos[0].codigo){
          depoTable[posIndex].insumos=[]
        }
        //Then, look if it is already in the position
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
          return
        } 
        else {
          if (!depo.cantidad){
            depoTable[posIndex].insumos.splice(indexDown,1)
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
        return
    }
  }
  fs.writeFile('../'+db+'/depositoTable.json',JSON.stringify(depoTable,null,2),function (err){
    if (err) throw (err);
  })
  console.log('Cambio en Deposito exitoso')
  res.status(200).send({message:'Exito'})
}

module.exports = {getTable, login, uploadInput}