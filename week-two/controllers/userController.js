'use strict';
// catController
const userModel = require('../models/userModel');

const users = userModel.users;

const getUsers = (req, res) => {
    // removes the passwords property of users from showing
    users.map(user => {
        delete user.password;
        return user;
    });
    res.json(users);
};

const getUser = (req, res) => {
    // chooses one object of an array with matching Id
    const user = users.filter(user => req.params.userId == user.id)[0];
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