const db = require ('../config.js')

const fs = require('graceful-fs');

const backup = ()=>{
  let armadoRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/armadoInputs.json','utf8')
  let armado = JSON.parse(armadoRaw)
  fs.writeFile('../../backup/armadoInputs.json',JSON.stringify(armado,null,2),function (err){
    if (err) throw (err);
  })
}

if (db === 'data samples' ) {
  setInterval(backup,1000*3600)
}

const getUsers = (req, res) => {
  let usersRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/armado/armadoUsers.json','utf8')
  let users = JSON.parse(usersRaw)
  res.send(users)
}

const getInputs = (req,res) => {
  let inputsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/armado/armadoInputs.json','utf8')
  let inputs = JSON.parse(inputsRaw)
  res.send(inputs)
}

const uploadInputs = (req,res)=>{
  let armadoInputsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/armado/armadoInputs.json','utf8')
  let armadoInputs = JSON.parse(armadoInputsRaw)

  const siniestro = req.body
  armadoInputs.push(siniestro)
  console.log(siniestro)
  fs.writeFile('../'+db+'/armado/armadoInputs.json',JSON.stringify(armadoInputs,null,2),function (err){
    if (err) throw (err);
  })
  res.send(siniestro)
}
const login = (req,res)=>{
  let armadoUserRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/armado/armadoUsers.json','utf8')
  let armadoUsers = JSON.parse(armadoUserRaw)

  const loginData = req.body
  console.log('login data',loginData)
  const index = armadoUsers.findIndex(lider => {
    return(
    lider.user===loginData.lider
    )
  })
  console.log('index: ',index)
  if (armadoUsers[index].password === '') {
    armadoUsers[index].password = loginData.contraseña
    fs.writeFile('../'+db+'/armado/armadoUsers.json',JSON.stringify(armadoUsers,null,2),function (err){
      if (err) throw (err);
    })
    res.send(armadoUsers[index])
  } else if(armadoUsers[index].password === loginData.contraseña) {
    console.log('Contraseña correcta')
    res.send(armadoUsers[index])  
  } else {
    console.log('Contraseña incorrecta')
    res.status(401).send({message:'Contraseña incorrecta'})
  }
}

module.exports = {uploadInputs, login, getUsers, getInputs}