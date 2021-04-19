const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var multer = require('multer');
var path = require('path');

var forms = multer();



//################################################################################################//
//################################################################################################//
//################################################################################################//
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/evergreen",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },

  () => {
    console.log("Mongo DB connected");
  }
);
/*
?
 */
const server = express();
server.use((req,res,next)=>{
  console.log('====================================');
  console.log("Server Live");
  console.log('====================================');
  console.log(req.originalUrl)
  next();
})

server.use(cors());
server.use(cookieParser());
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
  if (req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Credentials', true);
      return res.status(200).json({});
  }
  next();
});
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
server.use(bodyParser.json({limit: '50mb', extended: true})); 
server.use('/public',express.static(path.join(__dirname, 'public'))); //  "public" off of current is root
// server.use(multer().array())


// parse application/x-www-form-urlencoded
// server.use(bodyParser.urlencoded({ extended: true }))
// // parse serverlication/json
// server.use(bodyParser.json())




/*
! Register Routes Here
*/
const userRouter = require("./routes/user.route");
const validateRouter = require("./routes/validate.route");
const categoryRouter = require("./routes/category.route");
const productController = require("./routes/product.route");
server.use("/user", userRouter);
server.use("/validate", validateRouter);
server.use("/category", categoryRouter);
server.use("/product", productController);


//Page not found
server.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page not found ",
  });
});
//################################################################################################//
//################################################################################################//
//################################################################################################//

//REQUIRE MODELS
const userModel = require("./models/user.model");
// const userInput = {
//   username: "noob",
//   password: "admin",
//   role: "admin",
// };
// const user = new userModel(userInput);
// user.save((err, document) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(document);
//   }
// });

/*
! Server Startup Settings
*/

const PORT = process.env.APP_SERVER_PORT || "5000";
server.listen(5000,'0.0.0.0', (err) => {
  if (!err) {
    console.log(`NODE SERVER LISTENING ON PORT ${PORT}`);
  }
});
