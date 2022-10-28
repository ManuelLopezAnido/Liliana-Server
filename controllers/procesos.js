const db = require ('../config.js')
const fs = require('graceful-fs');

const getUsers = (req,res)=>{
  let usersRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosUsers.json','utf8')
  let prosUsers = JSON.parse(usersRaw)
  res.send(prosUsers)
}
const login = (req,res)=>{
  let usersRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosUsers.json','utf8')
  let prosUser = JSON.parse(usersRaw)
  const loginData = req.body

  const index = prosUser.findIndex(lider => {
    return(
    lider.user===loginData.user
    )
  })

  if (index === -1) {
    res.status(401).send({message:'El usuario no existe'})
    return
  }
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

const getFormsPz = (req,res) => {
  let formsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosFormsPz.json','utf8')
  let forms = JSON.parse(formsRaw)
  res.send(forms)
}
const postFormsPz = (req,res) => {
  const newForm = req.body
  let formsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosFormsPz.json','utf8')
  let forms = JSON.parse(formsRaw)
  forms.forEach(element => {
    if (element.id === newForm.id){
      res.status(401).send({message:'EL FORMULARIO YA EXISTE'})
      return
    }
  });
  forms.push(newForm)
  fs.writeFile('../'+db+'/procesosFormsPz.json',JSON.stringify(forms,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'El formulario fue cargado con éxito'})
}
const putFormsPz = (req,res) => {
  const updateForm = req.body
  let formsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosFormsPz.json','utf8')
  let forms = JSON.parse(formsRaw)
  const ind = forms.findIndex((form)=>{
    return(
      form.id === updateForm.id
    )
  })
  console.log(ind)
  if (ind === -1){
    res.status(401).send({message:'EL FORMULARIO NO EXISTE'})
    return
  } 
  for (prop in updateForm) {
    forms[ind][prop] = updateForm[prop]
  }

  fs.writeFile('../'+db+'/procesosFormsPz.json',JSON.stringify(forms,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'El formulario fue actualizado con éxito'})
}
const deleteFormsPz = (req,res) => {
  const idF = +req.params.id
  let formsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosFormsPz.json','utf8')
  let forms = JSON.parse(formsRaw)
  const ind = forms.findIndex((form)=>{
    return(
      form.id === idF
    )
  })
  if (ind === -1){
    res.status(401).send({message:'EL ID NO EXISTE'})
    console.log('El formulario no existe')
    return
  } 
  forms.splice(ind,1)
  fs.writeFile('../'+db+'/procesosFormsPz.json',JSON.stringify(forms,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'El formulario fue eliminado con éxito'})
}

//-------------Moldes-------------------

const getFormsMol = (req,res) => {
  let formsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosFormsMol.json','utf8')
  let forms = JSON.parse(formsRaw)
  res.send(forms)
}
const postFormsMol = (req,res) => {
  const newForm = req.body
  let formsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosFormsMol.json','utf8')
  let forms = JSON.parse(formsRaw)
  forms.forEach(element => {
    if (element.id === newForm.id){
      res.status(401).send({message:'EL FORMULARIO YA EXISTE'})
      return
    }
  });
  forms.push(newForm)
  fs.writeFile('../'+db+'/procesosFormsMol.json',JSON.stringify(forms,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'El formulario fue cargado con éxito'})
}
const putFormsMol= (req,res) => {
  const updateForm = req.body
  
  let formsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosFormsMol.json','utf8')
  let forms = JSON.parse(formsRaw)
  const ind = forms.findIndex((form)=>{
    return(
      form.id === updateForm.id
    )
  })
  if (ind === -1){
    res.status(401).send({message:'EL FORMULARIO NO EXISTE'})
    return
  } 

  for (prop in updateForm) {
    forms[ind][prop] = updateForm[prop]
  }
  fs.writeFile('../'+db+'/procesosFormsMol.json',JSON.stringify(forms,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'El formulario fue actualizado con éxito'})
}
const deleteFormsMol = (req,res) => {
  const idF = req.params.id
 
  let formsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosFormsMol.json','utf8')
  let forms = JSON.parse(formsRaw)
  const ind = forms.findIndex((form)=>{
    return(
      form.id === idF
    )
  })
  if (ind === -1){
    res.status(401).send({message:'EL ID NO EXISTE'})
    console.log('El formulario no existe')
    return
  } 
  
  forms.splice(ind,1)
  fs.writeFile('../'+db+'/procesosFormsMol.json',JSON.stringify(forms,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'El formulario fue eliminado con éxito'})
}
//--------------Maquinas------------------

const getFormsMaq = (req,res) => {
  let formsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosFormsMaq.json','utf8')
  let forms = JSON.parse(formsRaw)
  res.send(forms)
}
const postFormsMaq = (req,res) => {
  const newForm = req.body
  let formsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosFormsMaq.json','utf8')
  let forms = JSON.parse(formsRaw)
  forms.forEach(element => {
    if (element.id === newForm.id){
      res.status(401).send({message:'EL FORMULARIO YA EXISTE'})
      return
    }
  });
  forms.push(newForm)
  fs.writeFile('../'+db+'/procesosFormsMaq.json',JSON.stringify(forms,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'El formulario fue cargado con éxito'})
}
const putFormsMaq = (req,res) => {
  const updateForm = req.body
  let formsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosFormsMaq.json','utf8')
  let forms = JSON.parse(formsRaw)
  const ind = forms.findIndex((form)=>{
    return(
      form.id === updateForm.id
    )
  })
  if (ind === -1){
    res.status(401).send({message:'EL FORMULARIO NO EXISTE'})
    return
  } 
  for (prop in updateForm) {
    forms[ind][prop] = updateForm[prop]
  }
  fs.writeFile('../'+db+'/procesosFormsMaq.json',JSON.stringify(forms,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'El formulario fue actualizado con éxito'})
}
const deleteFormsMaq = (req,res) => {
  const idF = req.params.id
  let formsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/procesosFormsMaq.json','utf8')
  let forms = JSON.parse(formsRaw)
  const ind = forms.findIndex((form)=>{
    return(
      form.id === idF
    )
  })
  if (ind === -1){
    res.status(401).send({message:'EL ID NO EXISTE'})
    console.log('El formulario no existe')
    return
  } 
  forms.splice(ind,1)
  fs.writeFile('../'+db+'/procesosFormsMaq.json',JSON.stringify(forms,null,2),function (err){
    if (err) throw (err);
  })
  res.status(200).send({message:'El formulario fue eliminado con éxito'})
}
module.exports = 
{ 
  login, getUsers, 
  getFormsPz, postFormsPz, putFormsPz, deleteFormsPz,
  getFormsMol, postFormsMol, putFormsMol, deleteFormsMol,
  getFormsMaq, postFormsMaq, putFormsMaq, deleteFormsMaq,
}