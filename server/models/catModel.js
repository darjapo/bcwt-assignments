"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async (res) => {
  try {
    const sql = "SELECT cat_id, wop_cat.name, weight, wop_user.name as ownername, filename, birthdate" +
        " FROM wop_cat JOIN wop_user ON wop_cat.owner = wop_user.user_id"
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const getACatById = async (res, catId) => {
  try {
    const sql = "SELECT cat_id, wop_cat.name, weight, wop_user.name as ownername, filename, birthdate" +
        " FROM wop_cat JOIN wop_user ON wop_cat.owner = wop_user.user_id WHERE wop_cat.cat_id = ?"
    const [rows] = await promisePool.query(sql, [catId]);
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

const deleteCatById = async (catId, res) => {
  try {
    const [rows] = await promisePool.
    query("DELETE FROM wop_cat WHERE wop_cat.cat_id = ?", [catId]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const updateCatById = async (cat, res) => {
  try {
    console.log('Modifying cat:', cat);
    const sql = 'UPDATE wop_cat SET name = ?, weight = ?, owner = ?, birthdate = ?' +
        'WHERE cat_id = ?';
    const values = [cat.name, cat.weight, cat.owner, cat.birthdate, cat.id];
    const [rows] = await promisePool.query(sql, values);
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
  deleteCatById,
  updateCatById
};