'use strict';
// catRoutes
const express = require("express");
const router = express.Router();
const multer = require('multer')
const catController = require('../controllers/catController');

const upload = multer({ dest: 'uploads/'});

router.get('/', catController.getCats);

router.get('/:catId', catController.getCat);

router.post('/', upload.single('cat'), catController.createCat);

router.put('/', (req, res) => {
    res.send('From this endpoint you can edit cats.')
});

router.delete('/:catId', catController.deleteCat);

module.exports = router;