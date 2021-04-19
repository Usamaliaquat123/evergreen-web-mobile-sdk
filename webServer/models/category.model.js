const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  catName: {
    type: String,
    required: true,
    unique: true 
  },
  catDescription: {
    type: String,
    required: true,
  },
  catImagePath:{
    type: String,
    required: true,
  },
   products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("category", categorySchema);
