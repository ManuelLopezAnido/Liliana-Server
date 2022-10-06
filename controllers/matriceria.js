const db = require ('../config.js')
const fs = require('graceful-fs');


const getTable = (req,res)=>{
  let tableRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/matriceria/moldesTable.json','utf8')
  let table = JSON.parse(tableRaw)
  res.send(table)
}
const getMoldes = (req, res) => {
  let moldesRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/matriceria/moldesMatriceria.json','utf8')
  let moldes = JSON.parse(moldesRaw)
  res.send(moldes)
}

const uploadInput = (req,res)=>{
  let moldesTableRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/matriceria/moldesTable.json','utf8')
  let moldesTable = JSON.parse(moldesTableRaw)
  let inputsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/matriceria/matriceriaInputs.json','utf8')
  let inputs = JSON.parse(inputsRaw)
  
  const molde = req.body
  inputs.push(molde)
  
  console.log('Datos ingresado', molde)
  fs.writeFile('../'+db+'/matriceria/matriceriaInputs.json',JSON.stringify(inputs,null,2),function (err){
    if (err) throw (err);
  })
  let posIndex = moldesTable.findIndex((pos)=>{
    return(pos.estanteria===molde.estanteria && pos.posicion===molde.posicion && pos.altura===molde.altura)
  })
  if (!moldesTable[posIndex]){
    console.log('La estantería no existe')
    res.status(401).send({message:'La estanteria no existe!'})
    return
  }
  else{
    moldesTable[posIndex].time = molde.time
    moldesTable[posIndex].date = molde.date
    moldesTable[posIndex].radio = molde.radio
    moldesTable[posIndex].comentarios = molde.comentarios
    
    switch (molde.radio){
      case 'add':
        //First look the amount of elements
        let maxAmount = 100
        switch(molde.estanteria){
          case 'A':
          case 'B':
            maxAmount = 4;
            break;
          case 'E':
          case 'C': 
            maxAmount = 8;
            break;
          case 'G':
            maxAmount = 7;
            break;
          case 'H':
            maxAmount = 3;
            break;
        }
        if (moldesTable[posIndex].insumos.length > maxAmount){
          console.log('La estantería llego a su capcidad maxima de ' + maxAmount + ' unidades')
          res.status(401).send({message:'La estantería llego a su capcidad maxima de ' + maxAmount + ' unidades'})
          return
        }

        //Second looks if insmuos is empty
        if(!moldesTable[posIndex].insumos[0].codigo){
          moldesTable[posIndex].insumos=[]
        }
        //Then, look if it is already in the position
        const indexAdd = moldesTable[posIndex].insumos.findIndex((insumo)=>{
          return(
            insumo.codigo === molde.codigo
          )
        })
        if (indexAdd === -1 || /^[V-Z]{1}$/.test(molde.estanteria)){
          moldesTable[posIndex].insumos.push({
            ['codigo']:molde.codigo,
            ['cantidad']:molde.cantidad,
            ['comentarios']:molde.comentarios
          })
        } else {
          
          moldesTable[posIndex].insumos[indexAdd].cantidad = +moldesTable[posIndex].insumos[indexAdd].cantidad + molde.cantidad
          moldesTable[posIndex].insumos[indexAdd].comentarios = molde.comentarios
        }
        break
      // case 'replace':
      //   moldesTable[posIndex].insumos=[{
      //     ['codigo']:molde.codigo,
      //     ['cantidad']:molde.cantidad,
      //     ['comentarios']:molde.comentarios
      //   }]
      //   break
      case 'down':
        //First, look if it is already in the position
        const indexDown = moldesTable[posIndex].insumos.findIndex((insumo)=>{
          return(
            insumo.codigo === molde.codigo
          )
        })
        if (indexDown === -1){
          res.status(401).send({message:'Este insumo no se encuentra en la estanteria!'})
          return
        } 
        else {
          if (!molde.cantidad){
            moldesTable[posIndex].insumos.splice(indexDown,1)
          } 
          else {
            moldesTable[posIndex].insumos[indexDown].cantidad -= molde.cantidad
            if (moldesTable[posIndex].insumos[indexDown].cantidad <= 0) {
              moldesTable[posIndex].insumos.splice(indexDown,1)
            }
          }
          // if insumos got empty, push one empty object element
          if (!moldesTable[posIndex].insumos.length){
            moldesTable[posIndex].insumos.push({
              codigo:'',
              cantidad: 0
            })
          }
        }
        break
      // case 'clean':
      //   moldesTable[posIndex].insumos=[{
      //     codigo:'',
      //     cantidad: 0
      //   }]
      //   break
      default:
        res.status(401).send({message:'Ingreso no válido'})
        return
    }
  }
  fs.writeFile('../'+db+'/matriceria/moldesTable.json',JSON.stringify(moldesTable,null,2),function (err){
    if (err) throw (err);
  })
  console.log('Cambio en Deposito exitoso')
  res.status(200).send({message:'Exito'})
}

module.exports = {getTable, uploadInput, getMoldes}