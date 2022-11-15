'use strict';
// catRoutes
const express = require("express");
const router = express.Router();
const multer = require('multer')
const catController = require('../controllers/catController');

const upload = multer({ dest: 'uploads/'});

router.get('/', catController.getCats)
    .get('/:catId', catController.getCat)
    .post('/', upload.single('cat'), catController.createCat)
    .put('/', catController.modifyCat)
    .put('/:catId', catController.modifyCat)
    .delete('/:catId', catController.deleteCat);

module.exports = router;