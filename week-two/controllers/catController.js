'use strict';
// catController
    const {rawListeners} = require('../database/db');
    const catModel = require('../models/catModel');

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

    const modifyCat = (req, res) => {

    };

    const createCat = async (req, res) => {
        const newCat = req.body;
        newCat.filename = req.file.filename;
        console.log('Creating a new user:', newCat);
        const catId = await catModel.addCat(newCat, res);
        res.status(201).json({catId});
    };

    const deleteCat = async (req, res) => {
        const result = await catModel.deleteACatById(req.params.catId, res);
        console.log('cat deleted', result)
        if (result.affectedRows > 0) {
            res.json({message: 'cat deleted'});
        } else {
            res.status(404).json({message: 'cat was already deleted'});
        }
    };

    module.exports = {
        getCat,
        getCats,
        modifyCat,
        createCat,
        deleteCat
    };