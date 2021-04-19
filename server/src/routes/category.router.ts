/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
const express = require('express');
const multer = require('multer');
const path = require('path');
const { body, validationResult, errors } = require('express-validator/check');
const CategoryModel = require('../models/category.model');

/**
 * !Multer Config
 */
const storage = multer.diskStorage({
  destination: './public/uploads/Category_Images/',
  filename(req, file, cb) {
    cb(null, `IMAGE-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
}).single('img');

const categoryRouter = express.Router();
categoryRouter.use((req, res, next) => {
  console.log('====================================');
  console.log('Category Router ');
  console.log('====================================');
  next();
});

/**
 *
 */

const categoryHelpers = {
  categoryExist: (name) => new Promise((resolve, reject) => {
    CategoryModel.findOne({ name }, (err, document) => {
      if (err) return reject(false);
      if (document) {
        return resolve(document);
      }

      return resolve(false);
    });
  }),
};

/**
 *INSERT
 */

categoryRouter.post('/insert',
// [body('name').not().isEmpty().withMessage('Category Name is required...')],
  (req, res) => {
    const errorsArray = validationResult(req);

    if (!errorsArray.isEmpty()) {
      return res.status(422).jsonp(errorsArray.array());
    }
    categoryHelpers.categoryExist(req.body.name).then((exist) => {
      if (exist) return res.status(422).json({ success: true, data: exist, message: 'category already exist' });
      upload(req, res, (err) => {
        if (err)console.log(err);
        // console.log('====================================');
        console.log('req.file', req.file);
        // console.log('req.file', req.body.img);
        // console.log('req.file', req.body.img.uri);
        // console.log('====================================');
        if (req.file && req.file.path !== undefined) {
          // const {
          //   path, originalname, destination, filename, size, mimetype,
          // } = req.file;
          req.body.img = req.file.path;
          const { name, img } = req.body;
          const newCategory = new CategoryModel({ name, img });
          newCategory.save((err, document) => {
            if (err) return res.status(500).json({ success: true, data: err, message: 'failed to insert category' });

            document.img = process.env.SERVER_DOMAIN + document.img;
            return res.status(200).json({ success: true, data: document, message: 'category inserted successfully' });
          });
        } else {
          return res.status(422).json({ success: false, message: 'Category Image is required...' });
        }
      });
    }).catch((error) => {
      console.log('====================================');
      console.log('Error==>', error);
      console.log('====================================');
      return res.status(500).json({ success: true, data: error, message: 'failed to insert category' });
    });
  });

/**
 *GET ALL
 */

categoryRouter.get('/all_categories', (req, res, next) => {
  console.log('====================================');
  console.log('category/all_categories');
  console.log('====================================');
  const { name, img } = req.body;
  const allCategories = [];
  CategoryModel.find({}, (err, dbCategories) => {
    if (err) return res.status(500).json({ success: true, data: err, message: 'failed to get all categories' });
    dbCategories.forEach((category) => {
      allCategories.push({ _id: category._id, name: category.name, img: process.env.SERVER_DOMAIN + category.img });
    });
    res.status(200).json({ success: true, data: allCategories, message: 'all categories fected successfully' });
  });
});

/**
 *CATEGORY ALREADY EXIST
 */

categoryRouter.get('/validate/exist', (req, res, next) => {
  console.log('====================================');
  console.log('/validate/exist');
  console.log('====================================');
  const { catName } = req.query;
  CategoryModel.find({ name: catName }, (err, dbCategories) => {
    if (err) return res.status(500).json({ success: true, data: err, message: 'failed to get all categories' });
    if (dbCategories.length > 0) {
      res.status(200).json({ success: true, data: true, message: `category already exist with name ${catName}` });
    } else {
      res.status(200).json({ success: true, data: false, message: `no category exist with name ${catName}` });
    }
  });
});

module.exports = categoryRouter;
export {};
