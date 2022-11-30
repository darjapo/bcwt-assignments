'use strict';
const catModel = require('../models/catModel');
const {validationResult} = require('express-validator');
const {ignore} = require("nodemon/lib/rules");
const { makeThumbnail, getCoordinates } = require("../utils/image");

const getCats = async (req, res) => {
        const cats = await catModel.getAllCats();
        res.json(cats);
    };

    const getCat = async (req, res) => {
        // chooses one object of an array with matching Id
        const cat = await catModel.getACatById(res, req.params.catId);
        if (cat) {
            res.json(cat);
        } else {
            res.sendStatus(404);
        };
    };

    const createCat = async (req, res) => {
        const errors = validationResult(req);
        // if file is missing (not passing multer's fileFilter in route)
        if (!req.file) {
            res.status(400).json({message: 'file missing or invalid'});
        } else if (errors.isEmpty()) {
            const newCat = req.body;
            await makeThumbnail(req.file.path, req.file.filename);
            // TODO: use image.js/getCoord to extract exif-data/gps coords and
            // add to the cat object as vat.coords property in array format (stringified)
            newCat.coords = JSON.stringify(await getCoordinates(req.file.path));
            newCat.owner = req.user.user_id;
            newCat.filename = req.file.filename;
            console.log('Creating a new user:', newCat);
            const catId = await catModel.addCat(newCat, res);
            res.status(201).json({catId});
        } else {
            res.status(400).json({
                message: 'cat creation failed',
                errors: errors.array()
            });
        }
    };

    const deleteCat = async (req, res) => {
        const result = await catModel.deleteCatById(req.params.catId, req.user.user_id, req.user.role, res);
        console.log('cat deleted', result)
        if (result.affectedRows > 0) {
            res.json({message: 'cat deleted'});
        } else {
            res.status(404).json({message: 'cat delete failed'});
        }
    };

    const modifyCat = async (req, res) => {
        const cat = req.body;
        if (req.params.catId) {
            cat.id = req.params.catId;
        };
        const result = await catModel.updateCatById(cat, req.user.user_id, req.user.role, res);
        if (result.affectedRows > 0) {
            res.json({message: 'cat modified', catId: cat.id});
        } else {
            res.status(404).json({message: 'cat was not changed'});
        }
    };

    module.exports = {
        getCat,
        getCats,
        modifyCat,
        createCat,
        deleteCat
    };