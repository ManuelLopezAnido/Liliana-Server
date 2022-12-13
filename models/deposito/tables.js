const mongoose = require('mongoose');

const { Schema } = mongoose;

const table = new Schema(
  {
    rack: String,
    position: String,
    height: String,
    supplies: [
      {
        amount: Number,
        code: String,
        comments: String
      }
    ],
    type: String,
    dateSend: String,
    timeSend: String
  },
  { _id: true, timestamps: true },
);
const myDB= mongoose.connection.useDb('DEPOSITO')
module.exports = myDB.model('Table', table);
