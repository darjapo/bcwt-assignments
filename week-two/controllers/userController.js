'use strict';
// catController
const userModel = require('../models/userModel');

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
    const result = await userModel.addUser(newUser, res);
    res.status(201).json({userId: result});
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