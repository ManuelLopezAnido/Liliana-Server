const db = require ('../config.js')

const dataProd = require ('../../'+db+'/productionTable.json')

const getTable = (req,res)=>{
  res.send(dataProd)
}

module.exports = {getTable}