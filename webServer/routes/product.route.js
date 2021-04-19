/*
 * User Routes
 */

const express = require("express");
const productRouter = express.Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
const productModel = require("../models/product.model");
const categoryModel = require("../models/category.model");
const passportConfig = require("../passport/passport");
const userModel = require("../models/user.model");
const { body, validationResult, errors } = require("express-validator/check");
const multer = require("multer");
const path = require("path");



const storage = multer.diskStorage({
  destination: "./public/uploads/categories/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("<NAME>");

/**
 * Sample req.File from Multer 
 * Request file --- {
  fieldname: '<NAME>',
  originalname: 'almond-1.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: './public/uploads/',
  filename: 'IMAGE-1610045102835.jpg',
  path: 'public/uploads/IMAGE-1610045102835.jpg',
  size: 65362
}
 * 
 */

productRouter.use((req,res,next)=>{
    console.log('====================================');
    console.log("ProductController ");
    console.log('====================================');
    next();
})


productRouter.get("/all_products",
//   passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
        console.log('====================================');
        console.log(new Date());
        console.log('====================================');
      productModel.find({},(err,products)=>{
          if(err) res.status(500).json({message: 'Failed to fetch all categories',success: false,data: err});
          console.log(products)
          const allProducts=[]
          products.forEach((product)=>{
            allProducts.push(product);
          })
          res.status(201).json({message: 'All Categories from database ',success: true,data: allProducts});
      })
        // let dbQuery = productModel.find()
        // return dbQuery.exec().then(allProducts => {
        //     console.log('====================================');
        //     console.log(allProducts);
        //     console.log('====================================');
        //     res.status(201).json({
        //         msgBody: 'All Categories from database ',
        //         success: true,
        //         payload: allProducts,
        //     });




        // }).catch((err) => {
        //     res.status(500).json({
        //         msgBody: 'Failed to fetch all categories',
        //         success: false,
        //         payload: err,
        //     });
        // });
        
       
    }
  }
);

module.exports = productRouter;
