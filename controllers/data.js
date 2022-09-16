const db = require ('../config.js')

const fs = require('graceful-fs');

const getMachines = (req,res)=>{
  let maqRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/maquinas.json','utf8')
  let maqs = JSON.parse(maqRaw)
  res.send(maqs)
}
const getPzAbas = (req,res)=>{
  let pzAbasRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/piezasAbastecimiento.json','utf8')
  let pz = JSON.parse(pzAbasRaw)
  res.send(pz)
}
const getPzDepo = (req,res)=>{
  let pzDepoRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/piezasDeposito.json','utf8')
  let pz = JSON.parse(pzDepoRaw)
  res.send(pz)
}

const getEmailsProcesos = (req,res)=>{
  let emailsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/emailsProcesos.json','utf8')
  let emails = JSON.parse(emailsRaw)
  res.send(emails)
}
const postEmailsProcesos = (req,res)=>{
  const newEmials = req.body
  fs.writeFile('../'+db+'/emailsProcesos.json',JSON.stringify(newEmials,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'Los mails fueron actualizados con éxito'})
}

const getEmailsInyeccion = (req,res) => {
  let emailsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/emailsInyeccion.json','utf8')
  let emails = JSON.parse(emailsRaw)
  res.send(emails)
}
const postEmailsInyeccion = (req,res)=>{
  const newEmials = req.body
  fs.writeFile('../'+db+'/emailsInyeccion.json',JSON.stringify(newEmials,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'Los mails fueron actualizados con éxito'})
}

const getMatriceriaUsers = (req,res) => {
  let usRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/matriceriaUsers.json','utf8')
  let users = JSON.parse(usRaw)
  res.send(users)
}
module.exports = {
  getMachines, getPzAbas, getPzDepo, 
  getEmailsProcesos, postEmailsProcesos, 
  getEmailsInyeccion, postEmailsInyeccion,
  getMatriceriaUsers
}