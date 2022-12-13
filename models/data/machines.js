const mongoose = require('mongoose');

const { Schema } = mongoose;

const machines = new Schema(
  {
    machine: String,
    ton: Number
  },
  { _id: true, timestamps: true },
);
const myDB= mongoose.connection.useDb('DATA')
module.exports = myDB.model('machines', machines);
