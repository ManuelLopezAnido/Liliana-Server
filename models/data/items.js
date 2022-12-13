const mongoose = require('mongoose');

const { Schema } = mongoose;

const items = new Schema(
  {
    code: String,
    description: String,
    area: String,
    family: String,
    inPallets: Number,
    stockMin: Number,
  },
  { _id: true, timestamps: true },
);
const myDB= mongoose.connection.useDb('DATA')
module.exports = myDB.model('items', items);
