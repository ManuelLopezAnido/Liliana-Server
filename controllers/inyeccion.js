const db = require ('../config.js')

const dataProd = require ('../../'+db+'/productionTable.json')


const fs = require('fs');

const getTable = (req,res)=>{
  res.send(dataProd)
}
const getUsers = (req,res)=>{
  let usersRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/inyeccionUsers.json','utf8')
  let inyUsers = JSON.parse(usersRaw)
  res.send(inyUsers)
}
const login = (req,res)=>{
  let usersRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/inyeccionUsers.json','utf8')
  let inyeccionUser = JSON.parse(usersRaw)
  const loginData = req.body
  console.log('login data',loginData)
  const index = inyeccionUser.findIndex(lider => {
    return(
    lider.user===loginData.lider
    )
  })
  console.log('index: ',index)
  console.log('password',inyeccionUser[index].password)
  if (inyeccionUser[index].password === "") {
    inyeccionUser[index].password = loginData.contraseña
    fs.writeFile('../'+db+'/inyeccionUsers.json',JSON.stringify(inyeccionUser,null,2),function (err){
      if (err) throw (err);
    })
    res.send(inyeccionUser[index])
  } else if(inyeccionUser[index].password === loginData.contraseña) {
    console.log('Contraseña correcta')
    res.send(inyeccionUser[index])  
  } else {
    console.log('Contraseña incorrecta')
    res.status(401).send({message:'Contraseña incorrecta'})
  }
}
const uploadInput = (req,res)=>{
  let inyeInputsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/inyeccionInputs.json','utf8')
  let inyeInputs = JSON.parse(inyeInputsRaw)

  const inyInput = req.body
  
  console.log('Datos ingresado', inyInput)
  let posIndex = inyeInputs.findIndex((inp)=>{
    return(
      inp.day===inyInput.day &&
      inp.shift === inyInput.shift  &&
      inp.machine===inyInput.machine 
    )
  })
  if (posIndex === -1){
    inyeInputs.push(inyInput)
  } else if (inyInput.edit) {
    inyeInputs.splice(posIndex,1)
    inyeInputs.push(inyInput)
  } else {
    res.status(401).send(
      {
        'message': 'Carga para esta maquina ya realizada',
        'exist': true,
        'inputs': inyInput
      }
    )
    return
  }
  fs.writeFile('../'+db+'/inyeccionInputs.json',JSON.stringify(inyeInputs,null,2),function (err){
    if (err) throw (err);
  })
  res.send(inyInput)
}

module.exports = {getTable, login, getUsers, uploadInput}