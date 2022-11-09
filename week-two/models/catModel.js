"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async (res) => {
  try {
    const [rows] = await promisePool.
    query("SELECT wop_cat.cat_id, wop_cat.name, wop_cat.weight, wop_user.name as ownername, wop_cat.filename" +
        " FROM wop_cat LEFT JOIN wop_user ON wop_cat.owner = wop_user.user_id");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const getACatById = async (res, catId) => {
  try {
    const [rows] = await promisePool.
    query("SELECT wop_cat.cat_id, wop_cat.name, wop_cat.weight, wop_user.name as ownername, wop_cat.filename" +
        " FROM wop_cat LEFT JOIN wop_user ON wop_cat.owner = wop_user.user_id WHERE wop_cat.cat_id = ?", [catId]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const addCat = async (cat, res) => {
  try {
    const sql = 'INSERT INTO wop_cat VALUES (null, ?, ?, ?, ?, ?)';
    const values = [cat.name, cat.weight, cat.owner, cat.filename, cat.birthdate];
    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const deleteACatById = async (res, catId) => {
  try {
    const [rows] = await promisePool.
    query("DELETE FROM wop_cat WHERE wop_cat.cat_id = ?", [catId]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = {
  getAllCats,
  getACatById,
  addCat,
  deleteACatById,
};