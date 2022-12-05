const mongoose = require('mongoose');

const { Schema } = mongoose;

const users = new Schema(
  {
    name: String,
    lastname: String,
    area: {
      area: String,
      shift: String
    },
    permissions: [String],
    password:{
      type: String,
      //select: false
    } 
  },
  { _id: true, timestamps: true },
);
const myDB= mongoose.connection.useDb('DATA')
module.exports = myDB.model('Users', users);
