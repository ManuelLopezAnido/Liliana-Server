const db = require ('../config.js')
const fs = require('graceful-fs');
const nodemailer = require("nodemailer");

const sendEmails = async (res,area,body) =>{
  //geting list of emails
  console.log('area: ',area)

  let emailsRaw
  switch (area) {
    case "moldes":
      emailsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/emails/inyeccionMoldes.json','utf8')
    break
    case "maquinas":
      emailsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/emails/inyeccionMaquinas.json','utf8')
    break
    case "procesos":
      emailsRaw = fs.readFileSync('C:/Users/mlopez/Desktop/'+db+'/emails/procesos.json','utf8')
    break
    default:
      res.status(401).send({message:'Error en el envio'})
    return
  }

  let emails = JSON.parse(emailsRaw)
  listOfEmails = emails.map((email)=>{
    return(
      email.email
    )
  })
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "reparaciones@liliana.com.ar", // generated ethereal user
      pass: "REPARACIONES_789_F1&/", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    to: listOfEmails, // list of receivers
    subject: body.subject, // Subject line
    text: "-", // plain text body
    html: body.message, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  return(res)
}

const matrices = (req,res) => {
  const area = req.params.area
  const emailBody = req.body
  try {
    sendEmails(res,area,emailBody)
    .then((res)=>{
      res.status(200).send({message:'Envio exitoso'})
      console.log('Envio de emails exitoso')
    })
  } catch (error) {
    console.log('Error: email, not sent')
    console.log(error)
    res.status(401).send({message:'Error en el envio'})
  }
}


module.exports = {matrices}