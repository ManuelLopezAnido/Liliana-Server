const db = require ('../config.js')
const fs = require ('graceful-fs');
const inputs = require ('../models/deposito/inputs')
const tables = require ('../models/deposito/tables')

 


const uploadAllInputs = (req,res)=>{ //cheked
  inputs.insertMany(allInputs)
  .then((data) => {
    console.log('uploadAll', data)
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
const addInput = (req,res)=>{  //checked
  addInputAsync(req,res)
  .then((result) => {
    console.log('EXITO: ', result)
    res.status(200).json({result})
  })
  .catch((error) => res.status(500).json(error));
}

//TABLES

const getTables = (req,res)=>{ //checked
  tables.find()
  .then((data) => {
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
const getOneTable = (req,res) => { 
  getOneTableAsync(req,res)
  .then((data) => {
    res.status(200).json({data})
  })
  .catch((error) => res.status(500).json(error));
}



const uploadTable = (req,res)=>{ // REVISAR ESTA. LA UNICA QUE FALTA EN TEORIA
  //TENGO QUE ACORDARME DE PUSHEAR A INPUTS

  const inp = req.body
  console.log('inpputs' , inp)
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
      case 'add':
        //First look the amount of elements
        let maxAmount
        switch(inp.estanteria){
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
        if (table.supplies.length > maxAmount){
          console.log('La estantería llego a su capcidad maxima de ' + maxAmount + ' unidades')
          mge = 'La estantería llego a su capcidad maxima de ' + maxAmount + ' unidades'
          return
        }
        //Then, look if it is already in the position
        const indexAdd = table.supplies.findIndex((supply)=>{
          return(
            supply.code === inp.codigo
          )
        })
        if (indexAdd === -1 || /^[V-Z]{1}$/.test(inp.estanteria)){
          if(!table.supplies[0].code){
            table.supplies=[]
          }
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
          }  // if insumos got empty, push one empty object element
          if (!table.supplies.length){
            table.supplies.push({
              code: '',
              amount: 0,
              comments: inp.comentarios
            })
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
        table.supplies = [{
          code: inp.codigo,
          amount: inp.cantidad,
          comments: inp.comentarios
        }]
        mge = 'Estanteria remplazada con exito' 
        break
      default:
        res.status(401).end({message:'Ingreso no válido'})
    }
    table.timeSend = inp.time
    table.dateSend = inp.date
    table.type = inp.radio
    console.log("Tabla: ",table)
    tables.findByIdAndUpdate(table._id,table)
    .catch((error) => res.status(500).json(error));
    res.send({message: mge})
  })  
}

module.exports = {uploadAllInputs, getInputs, addInput, uploadTable, getTables}