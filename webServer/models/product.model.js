const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription:{
    type: String,
    required: false, 
  },
  productImage:{
    type: String,
    required: false, 
  },
  productThumbnail:{
    type: String,
    required: false, 
  },
  productMedia:{
    type: String,
    required: false, 
  },
  productSalePrice:{
    type: String,
    required: false, 
  },
  productPurchasePrice:{
    type: String,
    required: false, 
  },
  productDiscount:{
    type: String,
    required: false, 
  },

});

module.exports = mongoose.model("product", todoSchema);
