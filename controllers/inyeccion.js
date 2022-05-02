const dataProd = require ('../data samples/productionTable.json')

const getTable = (req,res)=>{
  res.send(dataProd)
}

module.exports = { getTable }