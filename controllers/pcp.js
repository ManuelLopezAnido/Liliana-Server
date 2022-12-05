

const getTable = (req,res)=>{
  let productionInyRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/productionIny.json','utf8')
  let productionIny = JSON.parse(productionInyRaw)
  res.send(productionIny)
}

module.exports = {getTable}