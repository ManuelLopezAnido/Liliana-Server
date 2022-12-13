const mongoose = require('mongoose');

const { Schema } = mongoose;

const products = new Schema(
  {
    code: String,
    calipso: String,
    description: String
  },
  { _id: true, timestamps: true },
);
const myDB= mongoose.connection.useDb('DATA')
module.exports = myDB.model('products', products);
