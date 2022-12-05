const db = require ('../config.js')
const fs = require('graceful-fs');

const getMachines = (req,res)=>{
  let maqRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/datos/maquinas.json','utf8')
  let maqs = JSON.parse(maqRaw)
  res.send(maqs)
}


const getPzAbas = (req,res)=>{
  let pzAbasRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/datos/piezasAbastecimiento.json','utf8')
  let pz = JSON.parse(pzAbasRaw)
  res.send(pz)
}
const postPzAbas = (req,res)=>{
  const newPz = req.body
  let piezasRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/datos/piezasAbastecimiento.json','utf8')
  let piezas = JSON.parse(piezasRaw)
  const found = piezas.findIndex (pz => {
    return pz.articulo === newPz.codigo
  });
  let mes = ''
  if (found === -1 ){
    piezas.push({
      "articulo": newPz.codigo,
      "detalle": newPz.detalle,
      "familia": newPz.familia,
      "cantxPallet": newPz.cantxPallet,
      "stockM": newPz.stockM
    })
    mes='PIEZA NUEVA AGREGADA EXITOSAMENTE'
  } else {
    piezas[found].familia = newPz.familia
    piezas[found].cantxPallet = newPz.cantxPallet
    piezas[found].stockM = newPz.stockM
    mes='PIEZA EDITADA EXITOSAMENTE'
  }
  fs.writeFile('../'+db+'/datos/piezasAbastecimiento.json',JSON.stringify(piezas,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:mes})
  return
}
// const getUsersAbas = (req, res) => {
//   let usersRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/datos/abastecimientoUsers.json','utf8')
//   let users = JSON.parse(usersRaw)
//   res.send(users)
// }
// const postUserAbas = (req,res) => {
//   const newUser = req.body
//   let abasUserRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/datos/abastecimientoUsers.json','utf8')
//   let abasUser = JSON.parse(abasUserRaw)
//   const found = abasUser.findIndex (user => {
//     return user.user === newUser.nombreOpe
//   });
//   if (found !== -1 ){
//     res.status(401).send({message:'EL USUARIO YA EXISTE'})
//     return
//   }
//   abasUser.push(
//     {
//       "user": newUser.nombreOpe,
//       "shift": newUser.turno,
//       "password": ""
//     }
//   )
//   fs.writeFile('../'+db+'/datos/abastecimientoUsers.json',JSON.stringify(abasUser,null,2),function (err){
//     if (err) throw (err);
//   })
// }


const getPzDepo = (req,res)=>{
  let pzDepoRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/datos/piezasDeposito.json','utf8')
  let pz = JSON.parse(pzDepoRaw)
  res.send(pz)
}
const postPzDepo = (req,res)=>{
  const newPz = req.body
  let piezasRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/datos/piezasDeposito.json','utf8')
  let piezas = JSON.parse(piezasRaw)
  const found = piezas.findIndex (pz => {
    return pz.articulo === newPz.codigo
  });
  let mes = ''
  if (found === -1 ){
    piezas.push({
      "articulo": newPz.codigo,
      "detalle": newPz.detalle,
      "familia": newPz.familia,
      "cantxPallet": newPz.cantxPallet,
      "stockM": newPz.stockM
    })
    mes='PIEZA NUEVA AGREGADA EXITOSAMENTE'
  } else {
    piezas[found].familia = newPz.familia
    piezas[found].familia = newPz.cantxPallet
    piezas[found].familia = newPz.stockM
    mes='PIEZA EDITADA EXITOSAMENTE'
  }
  fs.writeFile('../'+db+'/datos/piezasDeposito.json',JSON.stringify(piezas,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:mes})
  return
}
// const getUsersDepo = (req, res) => {
//   let usersRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/datos/depositoUsers.json','utf8')
//   let users = JSON.parse(usersRaw)
//   res.send(users)
// }
// const postUserDepo = (req,res) => {
//   const newUser = req.body
//   let abasUserRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/datos/depositoUsers.json','utf8')
//   let abasUser = JSON.parse(abasUserRaw)
//   const found = abasUser.findIndex (user => {
//     return user.user === newUser.nombreOpe
//   });
//   if (found !== -1 ){
//     res.status(401).send({message:'EL USUARIO YA EXISTE'})
//     return
//   }
//   abasUser.push(
//     {
//       "user": newUser.nombreOpe,
//       "shift": newUser.turno,
//       "password": ""
//     }
//   )
//   fs.writeFile('../'+db+'/datos/depositoUsers.json',JSON.stringify(abasUser,null,2),function (err){
//     if (err) throw (err);
//   })
// }


const getProductos = (req,res) => {
  let productosRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/datos/productos2.json','utf8')
  let productos = JSON.parse(productosRaw)
  res.send(productos)
}
const postProductos = (req,res)=>{
  const newProd = req.body
  let productosRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/datos/productos2.json','utf8')
  let productos = JSON.parse(productosRaw)
  productos.push(newProd)
  fs.writeFile('../'+db+'/datos/productos2.json',JSON.stringify(productos,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'Producto nuevo agregado'})
  return
}


const getEmailsProcesos = (req,res)=>{
  let emailsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/emails/procesos.json','utf8')
  let emails = JSON.parse(emailsRaw)
  res.send(emails)
}
const postEmailsProcesos = (req,res)=>{
  const newEmials = req.body
  fs.writeFile('../'+db+'/emails/procesos.json',JSON.stringify(newEmials,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'Los mails fueron actualizados con éxito'})
}

const getEmailsInyeccionMaq = (req,res) => {
  let emailsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/emails/inyeccionMaquinas.json','utf8')
  let emails = JSON.parse(emailsRaw)
  res.send(emails)
}
const postEmailsInyeccionMaq = (req,res)=>{
  const newEmials = req.body
  fs.writeFile('../'+db+'/emails/inyeccionMaquinas.json',JSON.stringify(newEmials,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'Los mails fueron actualizados con éxito'})
}
const getEmailsInyeccionMol = (req,res) => {
  let emailsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/emails/inyeccionMoldes.json','utf8')
  let emails = JSON.parse(emailsRaw)
  res.send(emails)
}
const postEmailsInyeccionMol = (req,res)=>{
  const newEmials = req.body
  fs.writeFile('../'+db+'/emails/inyeccionMoldes.json',JSON.stringify(newEmials,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'Los mails fueron actualizados con éxito'})
}

const getMatriceriaUsers = (req,res) => {
  let usRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/matriceriaUsers.json','utf8')
  let users = JSON.parse(usRaw)
  res.send(users)
}
const getMatriceriaMoldes = (req, res) => {
  let moldesRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/datos/moldes.json','utf8')
  let moldes = JSON.parse(moldesRaw)
  res.send(moldes)
}

//Aux MongoDB


module.exports = {
  getMachines, 
  getPzAbas, postPzAbas, 
  // getUsersAbas, postUserAbas,
  getPzDepo, postPzDepo,
  // getUsersDepo, postUserDepo,
  getProductos, postProductos,
  getEmailsProcesos, postEmailsProcesos, 
  getEmailsInyeccionMaq, postEmailsInyeccionMaq,
  getEmailsInyeccionMol, postEmailsInyeccionMol,
  getMatriceriaUsers, getMatriceriaMoldes
}