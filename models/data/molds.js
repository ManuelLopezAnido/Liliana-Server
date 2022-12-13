const mongoose = require('mongoose');

const { Schema } = mongoose;

const molds = new Schema(
  {
    mold: String,
    description: String
  },
  { _id: true, timestamps: true },
);
const myDB= mongoose.connection.useDb('DATA')
module.exports = myDB.model('molds', molds);
