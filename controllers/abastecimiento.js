const db = require ('../config.js')
const fs = require('graceful-fs');

const backup = ()=>{
  let tableRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/abastecimientoTable.json','utf8')
  let table = JSON.parse(tableRaw)
  fs.writeFile('../backup/abasTable.json',JSON.stringify(table,null,2),function (err){
    if (err) throw (err);
  })
  let inputsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/abastecimientoInputs.json','utf8')
  let inputs = JSON.parse(inputsRaw)
  fs.writeFile('../backup/abasInputs.json',JSON.stringify(inputs,null,2),function (err){
    if (err) throw (err);
  })
}
if (db === 'data samples' ) {
  setInterval(backup,1000*3600)
}

const getTable = (req,res)=>{
  let tableRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/abastecimientoTable.json','utf8')
  let table = JSON.parse(tableRaw)
  res.send(table)
}

const getPiezas = (req, res) => {
  let piezasRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/piezasAbastecimiento.json','utf8')
  let piezas = JSON.parse(piezasRaw)
  res.send(piezas)
}

const getUsers = (req, res) => {
  let usersRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/abastecimientoUsers.json','utf8')
  let users = JSON.parse(usersRaw)
  res.send(users)
}

const getInputs = (req,res) => {
  let inputsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/abastecimientoInputs.json','utf8')
  let inputs = JSON.parse(inputsRaw)
  res.send(inputs)
}

const newWorker = (req,res) => {
  const newUser = req.body
  let abasUserRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/abastecimientoUsers.json','utf8')
  let abasUser = JSON.parse(abasUserRaw)
  const found = abasUser.findIndex (user => {
    return user.user === newUser.nombreOpe
  });
  if (found !== -1 ){
    res.status(401).send({message:'EL USUARIO YA EXISTE'})
    return
  }
  abasUser.push(
    {
      "user": newUser.nombreOpe,
      "shift": newUser.turno,
      "password": ""
    }
  )
  fs.writeFile('../'+db+'/abastecimientoUsers.json',JSON.stringify(abasUser,null,2),function (err){
    if (err) throw (err);
  })
}

const newPz = (req,res) => {
  const newPz = req.body
  let piezasRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/piezasAbastecimiento.json','utf8')
  let piezas = JSON.parse(piezasRaw)
  const found = piezas.findIndex (pz => {
    return pz.articulo === newPz.codigo
  });
  if (found !== -1 ){
    res.status(401).send({message:'LA PIEZA YA EXISTE'})
    return
  }
  piezas.push({
    "articulo": newPz.codigo,
    "detalle": newPz.detalle,
    "familia": newPz.familia,
    "cantxPallet": newPz.cantxPallet,
    "stockM": newPz.stockM
  })
  fs.writeFile('../'+db+'/piezasAbastecimiento.json',JSON.stringify(piezas,null,2),function (err){
    if (err) throw (err);
  })
}

const login = (req,res)=>{
  let abasUserRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/abastecimientoUsers.json','utf8')
  let abasUser = JSON.parse(abasUserRaw)
  
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
  let abasTableRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/abastecimientoTable.json','utf8')
  let abasTable = JSON.parse(abasTableRaw)
  let inputsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/abastecimientoInputs.json','utf8')
  let inputs = JSON.parse(inputsRaw)
  
  const abas = req.body
  inputs.push(abas)
  console.log('Datos ingresado', abas)
  fs.writeFile('../'+db+'/abastecimientoInputs.json',JSON.stringify(inputs,null,2),function (err){
    if (err) throw (err);
  })
  let posIndex = abasTable.findIndex((pos)=>{
    return(pos.estanteria===abas.estanteria && pos.posicion===abas.posicion && pos.altura===abas.altura)
  })
  if (!abasTable[posIndex]){
    res.status(401).send({message:'La estanteria no existe!'})
    console.log('La estantería no existe')
    return
  }
  else{
    console.log('Estanteria antes: ', abasTable[posIndex])
    abasTable[posIndex].time = abas.time
    abasTable[posIndex].date = abas.date
    abasTable[posIndex].radio = abas.radio
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
          console.log('index: ',insumo.codigo)
          return(
            insumo.codigo === abas.codigo
          )
        })
        console.log('index down',indexDown)
        if (indexDown === -1){
          console.log('Este insumo no se encuentra en la estanteria')
          res.status(401).send({message:'Este insumo no se encuentra en la estanteria!'})
          return
        } else {
          if (!abas.cantidad){
            const insumoToRemove = abasTable[posIndex].insumos[indexDown]
            abasTable[posIndex].insumos.splice(indexDown,1)
            res.status(200).send(insumoToRemove)
            return
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
        console.log(abas.altura)
        if (abas.altura.charAt(1)==="A"){
          for (let i = 0 ; i<4 ; i++){
            abasTable[posIndex + i].insumos=[{
              codigo:'',
              cantidad: 0
            }]
          }
        } else {
          abasTable[posIndex].insumos=[{
            codigo:'',
            cantidad: 0
          }]
        }
        break
      default:
        res.status(401).end({message:'Ingreso no válido'})
    }
    console.log('La estanteria despues: ', abasTable[posIndex])
  }
  fs.writeFile('../'+db+'/abastecimientoTable.json',JSON.stringify(abasTable,null,2),function (err){
    if (err) throw (err);
  })
  res.send(abasTable[posIndex])
}

module.exports = {getTable, login, uploadInput, getInputs, getPiezas, getUsers, newWorker, newPz}