const db = require ('../config.js')
const fs = require('fs');

const getUsers = (req,res)=>{
  let usersRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosUsers.json','utf8')
  let prosUsers = JSON.parse(usersRaw)
  res.send(prosUsers)
}
const login = (req,res)=>{
  let usersRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosUsers.json','utf8')
  let prosUser = JSON.parse(usersRaw)
  const loginData = req.body
  console.log('login data',loginData)
  const index = prosUser.findIndex(lider => {
    return(
    lider.user===loginData.user
    )
  })
  console.log('index: ',index)
  console.log('password: ',prosUser[index].password)
  if (prosUser[index].password === "") {
    prosUser[index].password = loginData.password
    fs.writeFile('../'+db+'/procesosUsers.json',JSON.stringify(prosUser,null,2),function (err){
      if (err) throw (err);
    })
    res.send(prosUser[index])
  } else if(prosUser[index].password === loginData.password) {
    console.log('Contraseña correcta')
    res.send(prosUser[index])  
  } else {
    console.log('Contraseña incorrecta')
    res.status(401).send({message:'Contraseña incorrecta'})
  }
}

module.exports = {login, getUsers}