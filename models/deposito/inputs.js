const mongoose = require('mongoose');

const { Schema } = mongoose;

const input = new Schema(
  {
    amount: Number,
    code: String,
    rack: String,
    position: String,
    height: String,
    comments: String,
    type: String,
    worker: String,
    dateSend: String,
    timeSend: String
  },
  { _id: true, timestamps: true },
);
const myDB= mongoose.connection.useDb('DEPOSITO')
module.exports = myDB.model('Input', input);
