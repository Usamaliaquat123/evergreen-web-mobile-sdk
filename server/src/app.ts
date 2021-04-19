const express = require('express');
require('../config/db.js');
const bodyParser = require('body-parser');
const path = require('path');
// Require Configs and Environment files
require('dotenv').config({
  path: './config/config.env',
});

const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use('/web/api/public', express.static(path.join(__dirname, '../public')));
const port = 8000; // default port to listen

app.use((req, res, next) => {
  console.log('====================================');
  console.log('req', req.headers.host + req.originalUrl);
  console.log('====================================');
  next();
});
const categoryRouter = require('./routes/category.router.ts');

app.use('/web/api/category', categoryRouter);
const productRouter = require('./routes/product.router.ts');

app.use('/web/api/product', productRouter);

const userRouter = require('./routes/user.router.ts');

app.use('/web/api/user', userRouter);

app.use((req, res, next) => {
  console.log('====================================');
  console.log('Route Not Found ', req.headers.host + req.originalUrl);
  console.log('====================================');
  next();
});
// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
export {};
