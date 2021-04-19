/*
 * User Routes
 */

const express = require('express');
const categoryRouter = express.Router();
const passport = require('passport');
const JWT = require('jsonwebtoken');
const categoryModel = require('../models/category.model');
const passportConfig = require('../passport/passport');
const userModel = require('../models/user.model');
const { body, validationResult, errors } = require('express-validator/check');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: './public/uploads/categories/',
    filename: function(req, file, cb) {
        cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single('<NAME>');

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
categoryRouter.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    //   body('catName').custom((catName) => {
    //     var query = User.find({ catName: catName})
    //     return query.exec().then(user => {
    //         if (user.length > 0) {
    //              return Promise.reject('E-mail already in use');
    //         }
    //     });
    // }),
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            upload(req, res, (err) => {
                if (!err) {
                    const { catName, catDescription } = req.body;
                    const {
                        path,
                        originalname,
                        destination,
                        filename,
                        size,
                        mimetype,
                    } = req.file;
                    let newCategory = new categoryModel({
                        catName: catName,
                        catDescription: catDescription,
                        catImagePath: path,
                    });
                    newCategory.save((err, document) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({
                                msgBody: 'Failed to create category ... ',
                                success: false,
                                payload: err,
                            });
                        } else {
                            res.status(201).json({
                                msgBody: 'Category created successfully ...',
                                success: true,
                                payload: document,
                            });
                        }
                    });
                } else {
                    res.status(500).json({
                        msgBody: 'Opertaion Failed',
                        success: false,
                        payload: err,
                    });
                }
            });
        }
    }
);

/**
 * 
 * Catgory Already Exist 
 * POST
 * @param[catName]
 */

categoryRouter.post(
    '/validate/alreadyExist',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        let dbQuery = categoryModel.find({ catName: req.body.catName })
        return dbQuery.exec().then(category => {
            if (category.length > 0) {
                res.status(201).json({
                    msgBody: 'Category already Exist  ...',
                    success: true,
                    payload: true,
                });
            } else {
                res.status(201).json({
                    msgBody: 'Category doesnot exist in database',
                    success: true,
                    payload: false,
                });
            }
        });
    })

/**
 * 
 * fetch All Categories
 * GET
 */

categoryRouter.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log("***- /all -***")
        let dbQuery = categoryModel.find()
        return dbQuery.exec().then(allCatagories => {

            res.status(201).json({
                msgBody: 'All Categories from database ',
                success: true,
                payload: allCatagories,
            });




        }).catch((err) => {
            res.status(500).json({
                msgBody: 'Failed to fetch all categories',
                success: false,
                payload: err,
            });
        });
    })


/**
 * 
 * fetch All Categories
 * GET
 */

categoryRouter.get(
    '/delete',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log("***- /delete/:catName -***")
        let dbQuery = categoryModel.find({ catName: req.query.catName })
        return dbQuery.exec().then(category => {
            if (category.length > 0) {
                category[0].delete()
                res.status(201).json({
                    msgBody: 'Category deleted successfully ...',
                    success: true,
                    payload: true,
                });
            } else {
                res.status(201).json({
                    msgBody: 'Failed to delete category',
                    success: true,
                    payload: false,
                });
            }
        });
    })

/**
 * 
 * Helping Function
 * usage 
 * let categoryExist= await duplicateCategoryName(req.body.catName)
 */
const duplicateCategoryName = async(catName) => {
    return new Promise((resolve, reject) => {
        categoryModel.findOne({ catName: catName }, (err, document) => {
            if (!err) {
                return resolve(true)
            } else {
                console.log(err)
                return reject(false)
            }
        })
    })
}

module.exports = categoryRouter;