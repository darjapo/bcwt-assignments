'use strict';
// catRoutes
const express = require("express");
const router = express.Router();
const multer = require('multer')
const {body} = require('express-validator');

const catController = require('../controllers/catController');
const userController = require("../controllers/userController");

const fileFilter = (req, file, cb) => {
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (acceptedTypes.includes(file.mimeType)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const upload = multer({ dest: 'uploads/', fileFilter});

router.get('/', catController.getCats)
    .get('/:catId', catController.getCat)
    .post('/',
        upload.single('cat'),
        body('name').isAlphanumeric().trim().escape(),
        body('birthdate').isDate(),
        body('weight').isFloat({min: 0.1, max: 30}),
        body('owner').isInt({min:1}),
        catController.createCat)
    .put('/', catController.modifyCat)
    .put('/:catId', catController.modifyCat) // TODO: add validators, the same as post
    .delete('/:catId', catController.deleteCat);

module.exports = router;