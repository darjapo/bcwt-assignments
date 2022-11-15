"use strict"
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async (res) => {
  try {
    const [rows] = await promisePool.
    query("SELECT user_id, name, email, role FROM wop_user");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const getAUserById = async (res, userId) => {
  try {
    const [rows] = await promisePool.
    query("SELECT user_id, name, email, role FROM wop_user WHERE wop_user.user_id = ?",
        [userId]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const addUser = async (user, res) => {
  try {
    const sql = 'INSERT INTO wop_user VALUES (null, ?, ?, ?, ?)';
    const values = [user.name, user.email, user.passwd, user.role];
    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = {
  getAllUsers,
  getAUserById,
  addUser,
};