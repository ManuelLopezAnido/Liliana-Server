
const User = require('../models/data/users.js');

const uploadAllUsers = (req,res)=>{
  User.insertMany(allUsers)
  .then((data) => {
    console.log('EXITO: ', data)
    res.status(200).json({data})
  })
  .catch((error) => res.status(500).json(error));
}
const toUpperCase = (req,res)=>{
  User.find()
  .then((data) => { 
    data.forEach((element) => {
    User.findByIdAndUpdate(element._id,{
      "area.area": element.area.area.toUpperCase()
    }, function (err, docs) {
      if (err){
        console.log(err)
      }
      else{
        console.log("Updated User : ", docs);
      }
    })
  })
  }) 
  .then((data) => {
    console.log('EXITO: ', data)
    res.status(200).json(data)
    })
  .catch((error) => res.status(500).json(error))
}//this if change to upper case all the areas 
const getUsers = (req,res)=>{
  User.find({},'-password')
  .then((data) => {
  console.log('EXITO: ', data)
  res.status(200).json(data)
  })
  .catch((error) => res.status(500).json(error));
}
const updateUserAbas = (req,res) => {
  const inp=req.body
  const newUser = new User (
    {
      name: inp.name,
      lastname: inp.lastname,
      area: {
        area: "ABASTECIMIENTO",
        shift: inp.shift
      },
      permissions: ["abastecimiento"],
      password:""
    }
  )
  newUser.save()
  .then((result) => {
    res.status(200).json({result})
  })
  .catch((error) => res.status(500).json(error));
}
const updateUserDepo = (req,res) => {
  const inp=req.body
  const newUser = new User (
    {
      name: inp.name,
      lastname: inp.lastname,
      area: {
        area: "DEPOSITO",
        shift: inp.shift
      },
      permissions: ["deposito"],
      password:""
    }
  )
  newUser.save()
  .then((result) => {
    res.status(200).json({result})
  })
  .catch((error) => res.status(500).json(error));
}
const updateUserInye = (req,res) => {
  const inp=req.body
  const newUser = new User (
    {
      name: inp.name,
      lastname: inp.lastname,
      area: {
        area: "INYECCION",
        shift: inp.shift
      },
      permissions: ["inyeccion"],
      password:""
    }
  )
  newUser.save()
  .then((result) => {
    res.status(200).json({result})
  })
  .catch((error) => res.status(500).json(error));
}


const login = (req, res) => {
  const loginUser = req.body

  User.findById(loginUser.id, (err, docs) => {
    if (err){
      console.log('El usuario no existe')
      res.status(401).send({message:'El usuario no existe'})
    }
    else{
      if (docs.password === ""){
        docs.password=loginUser.password
        docs.save()
        .then(()=>res.status(200).send({
          message: 'Contrseña guardada',
          userData: docs
      }))
        .catch(()=>res.status(500).send({message:'Error de servidor'}))
      }
      else {
        if (loginUser.password === docs.password){
          res.status(200).send({
            message: 'Ingreso exitoso!',
            userData: docs
          })
        } else {
          res.status(401).send({message:'Contraseña Incorrecta'})
        }
      }
    }
});

}


module.exports = {
  uploadAllUsers, toUpperCase,
  getUsers, updateUserAbas, updateUserDepo, updateUserInye, login
}