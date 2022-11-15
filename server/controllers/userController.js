'use strict';
// catController
const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');

const getUsers = async (req, res) => {
    const users = await userModel.getAllUsers(res);
    res.json(users);
};

const getUser = async (req, res) => {
    // chooses one object of an array with matching Id
    try {
        const user = await userModel.getAUserById(res, req.params.userId);
        res.json(user)
    } catch (e) {
        res.sendStatus(404);
    }
};

const modifyUser = (req, res) => {

};

const createUser = async (req, res) => {
    console.log('Creating a new user:', req.body);
    const newUser = req.body;
    if (!newUser.role) {
        // default user role (normal user)
        newUser.role = 1;
    }
    const errors = validationResult(req);
    console.log('validation errors', errors);
    if (errors.isEmpty()) {
        const result = await userModel.addUser(newUser, res);
        res.status(201).json({message: 'user created', userId: result});
    } else {
        res.status(400).json({
            message: 'user creation failed',
            errors: errors.array()
        });
    };
};

const deleteUser = (req, res) => {

};

module.exports = {
    getUser,
    getUsers,
    modifyUser,
    createUser,
    deleteUser
};