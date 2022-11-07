"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async (res) => {
  try {
    const [rows] = await promisePool.
    query("SELECT * FROM wop_user");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const getAUserById = async (res, userId) => {
  try {
    const [rows] = await promisePool.
    query("SELECT * FROM wop_user WHERE wop_user.user_id = ?", [userId]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = {
  getAllUsers,
  getAUserById,
};