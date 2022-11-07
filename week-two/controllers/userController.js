'use strict';
// catController
const userModel = require('../models/userModel');

const users = userModel.users;

const getUsers = async (req, res) => {
    const users = await userModel.getAllUsers();
    users.map(user => {
        delete user.password;
        return user;
    });
    res.json(users);
};

const getUser = async (req, res) => {
    // chooses one object of an array with matching Id
    const user = await userModel.getAUserById(res, req.params.userId);
    if (user) {
        delete user.password;
        res.json(user);
    } else {
        res.sendStatus(404);
    };
};

const modifyUser = (req, res) => {

};

const createUser = (req, res) => {
    //console.log(req.body);
    const userInfo = `username: ${req.body.name}, email: ${req.body.email}`;
    res.send('Adding new user ' + userInfo);
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