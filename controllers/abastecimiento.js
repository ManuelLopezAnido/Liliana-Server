const db = require ('../config.js')
const fs = require('graceful-fs');
const inputs = require ('../models/abastecimiento/inputs')
const tables = require('../models/abastecimiento/tables');


//INPUTS
const uploadAllInputs = (req,res)=>{
  inputs.insertMany(allInputs)
  .then((data) => {
    console.log('EXITO: ', data)
    res.status(200).json({data})
  })
  .catch((error) => res.status(500).json(error));
} 

const getInputs = (req,res)=>{
  const month = req.params.month
  inputs.find({
    $or: [
      {dateSend: {$regex: "/"+month+"/"}}
    ]
  })
  .then((data) => {
    console.log('EXITO: ')
    res.status(200).json(data)
  })
  .catch((error) => res.status(500).json(error));
}

const addInputAsync = (req,res) => {
  const inp= req.body
  const newInput = new inputs(
  {
    "code": inp.codigo,
    "rack": inp.estanteria,
    "position": inp.posicion,
    "height": inp.altura,
    "comments": inp.comentarios,
    "amount": inp.cantidad,  
    "type": inp.radio,
    "timeSend": inp.time,
    "dateSend": inp.date,
    "worker": inp.operario
  })
  return newInput.save()
  .catch((error) => {
    throw error
  });
}
const 
addInput = (req,res)=>{ //checked 
  addInputAsync(req,res)
  .then((result) => {
    console.log('EXITO: ', result)
    res.status(200).json({result})
  })
  .catch((error) => res.status(500).json(error));
}

//TABLES
const uploadAllTable = (req,res) => {
  tables.insertMany(allTables)
  .then((data) => {
    console.log('EXITO: ', data)
    res.status(200).json({data})
  })
  .catch((error) => res.status(500).json(error));
}
const login = (req,res)=>{
  let abasUserRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/datos/abastecimientoUsers.json','utf8')
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
    fs.writeFile('../'+db+'/datos/abastecimientoUsers.json',JSON.stringify(abasUser,null,2),function (err){
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

const getTables = (req,res)=>{
  tables.find()
  .then((data) => {
    console.log('EXITO: ', data)
    res.status(200).json(data)
  })
  .catch((error) => res.status(500).json(error));
}

const getOneTableAsync = (req,res) => {
  const inp= req.body
  return tables.findOne(
    {
      "rack": inp.estanteria,
      "position": inp.posicion,
      "height": inp.altura
    }
  )
  .catch((error) => {
  throw error
  });
}
const getOneTable = (req,res) => { //checked
  getOneTableAsync(req,res)
  .then((data) => {
    console.log('EXITO: ', data)
    res.status(200).json({data})
  })
  .catch((error) => res.status(500).json(error));
}

const uploadTable = async (req,res)=>{
  const inp = req.body
  addInputAsync(req,res)
  getOneTableAsync(req,res)
  .then((table)=>{
    if (!table){
      res.status(401).send({message:'La estanteria no existe!'})
       console.log('La estantería no existe')
      return
    }
    let mge = ''
    switch (inp.radio){
      case 'add': //checked
        //First, it looks if insmuos is empty 
        if (table.supplies[0].code===""){
          table.supplies=[] // if it does, I don't want to have an empty supply anymore
        }
        //Second, look if it is already in the position
        const indexAdd = table.supplies.findIndex((supply)=>{
          return(
            supply.code === inp.codigo
          )
        })
        if (indexAdd === -1 || /^[V-Z]{1}$/.test(inp.estanteria)){
          table.supplies.push({
            ['code']:inp.codigo,
            ['amount']:inp.cantidad,
            ['comments']:inp.comentarios
          })
        } else {
          table.supplies[indexAdd].amount += inp.cantidad
          table.supplies[indexAdd].comments = inp.comentarios
        }
        mge = 'Cantidad agregada correctamente'
        break
      case 'down': //checked
        const indexDown = table.supplies.findIndex((supply)=>{
          return(
            supply.code === inp.codigo
          )
        })
        if (indexDown === -1){
          console.log('Este insumo no se encuentra en la estanteria')
          res.status(401).send({message:'Este insumo no se encuentra en la estanteria!'})
          return
        } else {
          if (!inp.cantidad || inp.cantidad === table.supplies[indexDown].amount ){ 
            // if input amount is zero, or equal to actual amount, then empty the supply
            table.supplies.splice(indexDown,1)
            mge = 'Insumo vaciado en su totalidad'
          } else if(inp.cantidad > table.supplies[indexDown].amount) { 
            // if input amount more than actual amount. Throw error
            console.log('No se puede retirar mas cantidad de la que existe')
            res.status(401).send({message:'No se puede retirar mas cantidad de la que existe'})
            return
          } else {
            //nomral case, just discount input amount
            table.supplies[indexDown].amount -= inp.cantidad
            table.supplies[indexDown].comments = inp.comentarios
            mge = 'Cantidad bajada correctamente'
          if (!abas.cantidad){
            const insumoToRemove = abasTable[posIndex].insumos[indexDown]
            abasTable[posIndex].insumos.splice(indexDown,1)
          } 
          else {
            abasTable[posIndex].insumos[indexDown].cantidad -= abas.cantidad
            if (abasTable[posIndex].insumos[indexDown].cantidad <= 0) {
              abasTable[posIndex].insumos.splice(indexDown,1)
            }
          }
          // if insumos got empty, push one empty object element
          if (!table.supplies.length){
            table.supplies.push({
              code: '',
              amount: 0,
              comments: inp.comentarios
            })
          }
          }
        }
        break
      case 'clean':
        table.supplies = [{
          code: '',
          amount: 0,
          comments: inp.comentarios
        }]
        mge = 'Estanteria vaciada con exito' 
        break
      case 'replace':
        //this case is managed in the front end
        break
      default:
        res.status(401).end({message:'Ingreso no válido'})
    }
    table.timeSend = inp.time
    table.dateSend = inp.date
    table.type = inp.radio
    tables.findByIdAndUpdate(table._id,table)
    .catch((error) => res.status(500).json(error));
    res.send({message: mge})
  })  
}


module.exports = { addInput, getInputs, getTables, getOneTable, uploadTable, uploadAllInputs, uploadAllTable}