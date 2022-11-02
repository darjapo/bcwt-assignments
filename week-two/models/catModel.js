"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async (res) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
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
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.
    query("SELECT wop_cat.cat_id, wop_cat.name, wop_cat.weight, wop_user.name as ownername, wop_cat.filename" +
        " FROM wop_cat LEFT JOIN wop_user ON wop_cat.owner = wop_user.user_id WHERE wop_cat.cat_id = ?", [catId]);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = {
  getAllCats,
  getACatById,
};