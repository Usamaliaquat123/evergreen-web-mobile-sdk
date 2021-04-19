/* eslint-disable no-unused-vars */
// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
    default: '',
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  updated_at: { type: Date, default: Date.now() },
  created_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('category', CategorySchema);
export {};
